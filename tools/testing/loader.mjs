import { existsSync, realpathSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { isAbsolute, join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { transform } from '@swc/core';

const { source } = createRequire(import.meta.url)('../../paths.config.js');

// Every path decision is anchored to the project root, never to a substring of
// the file URL: a checkout can itself live under a directory called `src`
// (the .NET layout <repo>/src/<Project>/Frontend is the common case), and a
// substring test would then match node_modules too and force every CommonJS
// dependency through the JSX transform.
// realpath, because Node resolves symlinks before calling these hooks.
const ROOT = realpathSync(process.cwd());

// Directories whose .js files are ESM project source, and so get the JSX
// transform. Read from paths.config.js so renaming the source directory can't
// silently turn the transform off.
const SOURCE_ROOTS = [join(ROOT, source)];

// Path aliases, mirroring the rspack build (tools/rspack/config/base/html.js),
// plus a test-only `@testing` alias for shared test helpers (e.g. the opt-in
// happy-dom setup).
const ALIASES = {
    '@constants': join(ROOT, source, 'templates/constants'),
    '@templates': join(ROOT, source, 'templates'),
    '@layouts': join(ROOT, source, 'templates/layouts'),
    '@components': join(ROOT, source, 'templates/components'),
    '@testing': join(ROOT, 'tools/testing'),
};

// Mirrors the build's JSX transform: Preact via the automatic JSX runtime.
const SWC_OPTIONS = {
    jsc: {
        target: 'es2022',
        parser: { syntax: 'ecmascript', jsx: true },
        transform: { react: { runtime: 'automatic', importSource: 'preact' } },
    },
    // Inline maps so test stack traces point at the original source, not the
    // transformed output.
    sourceMaps: 'inline',
};

// Native ESM has no extension/index resolution; the build does. Probe the same
// candidates rspack would (extensions before directory index) so alias and
// extensionless imports resolve identically in tests and in the build. Matches
// rspack's defaults: resolve.extensions ['.js', '.json'], mainFiles ['index'].
const CANDIDATES = ['', '.js', '.json', '/index.js', '/index.json'];

// Resolution failures the build would not have had: Node does no extension or
// directory-index search inside packages that have no `exports` map, rspack
// does. Anything else — a genuinely missing package, or a subpath an `exports`
// map deliberately withholds — is left to fail as Node intends.
const RESOLVE_FALLBACKS = new Set(['ERR_MODULE_NOT_FOUND', 'ERR_UNSUPPORTED_DIR_IMPORT']);

// Search param marking the facade's pass-through import of the real CommonJS
// module (see `load`).
const CJS_INTEROP = 'cjs-interop';

const IN_NODE_MODULES = /[\\/]node_modules[\\/]/;

const probe = absPath => {
    for (const suffix of CANDIDATES) {
        const candidate = absPath + suffix;
        if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
    }
    return null;
};

// True when `file` sits inside `dir`. A string prefix test would also match a
// sibling like `src-legacy`, and on the URL it would have to agree with Node
// on percent-encoding — this project's own path contains a space.
const contains = (dir, file) => {
    const rel = relative(dir, file);

    return rel !== '' && !rel.startsWith('..') && !isAbsolute(rel);
};

// Neither relative, nor absolute, nor a URL, nor a package `#import`: a package
// specifier, the only kind the CommonJS resolution fallback can help with.
const isBareSpecifier = specifier =>
    !specifier.startsWith('.') && !specifier.startsWith('/') && !specifier.startsWith('#')
    && !/^[a-z][a-z\d+\-.]*:/i.test(specifier);

// Project files SWC has to transform: JSX is not valid input for Node, and this
// project authors it in .js under the source root. node_modules is always
// someone else's build output, and tools/** is CommonJS the build runs directly.
const isProjectSource = filename =>
    filename.endsWith('.js')
    && !IN_NODE_MODULES.test(filename)
    && SOURCE_ROOTS.some(root => contains(root, filename));

// Rspack (like webpack) unwraps the `default` of a CommonJS module that marks
// itself with `__esModule` — the shape every SWC/Babel/TypeScript-compiled
// package ships, the Scottish Government Design System included. Native ESM
// does not: `import d from 'pkg'` hands over the whole `module.exports`, so a
// source module importing such a package would see a different value under test
// than in the build. That divergence is silent, which makes it worse than an
// error, and no test helper can fix it — it is the source module's own import.
//
// This facade closes the gap: the real module is imported unchanged through a
// marked URL, its named exports are re-exported by `export *` (so Node's own
// cjs-module-lexer enumerates them, and the module never has to be executed on
// the hooks thread), and only `default` is re-pointed. The `__esModule` check is
// repeated at runtime, so a module that merely mentions the string in a comment
// behaves exactly as it does today.
//
// Note this only affects the ESM-to-CommonJS boundary — the boundary the module
// under test crosses. Async `register()` hooks do not intercept `require()`, so
// a dependency's internal `require('./utils')` still gets the real
// `module.exports`. Keep the harness on `register`: `module.registerHooks` does
// intercept `require`, and would break that.
const cjsInteropFacade = url => {
    const raw = JSON.stringify(`${url}${url.includes('?') ? '&' : '?'}${CJS_INTEROP}`);

    return [
        `import * as cjs from ${raw};`,
        `export * from ${raw};`,
        'const exported = cjs.default;',
        'export default exported != null && exported.__esModule ? exported.default : exported;',
        '',
    ].join('\n');
};

export async function resolve(specifier, context, nextResolve) {
    // Resolve project-local specifiers (aliases + relative) the way the build
    // does; defer everything else to Node.
    let basePath;

    for (const [alias, target] of Object.entries(ALIASES)) {
        if (specifier === alias || specifier.startsWith(`${alias}/`)) {
            basePath = join(target, specifier.slice(alias.length));
            break;
        }
    }

    if (!basePath && specifier.startsWith('.') && context.parentURL) {
        basePath = fileURLToPath(new URL(specifier, context.parentURL));
    }

    if (basePath) {
        const found = probe(basePath);
        if (found) return { url: pathToFileURL(found).href, shortCircuit: true };
    }

    try {
        return await nextResolve(specifier, context);
    } catch (error) {
        if (!RESOLVE_FALLBACKS.has(error.code) || !isBareSpecifier(specifier) || !context.parentURL) throw error;

        // CommonJS resolution does the node_modules walk, the extension search
        // and the directory-index search the build does, and still honours
        // `exports` maps — so a subpath a package withholds stays withheld.
        // Rethrow the original ESM error if it can't help either, so the message
        // still names the failing import.
        try {
            return { url: pathToFileURL(createRequire(context.parentURL).resolve(specifier)).href, shortCircuit: true };
        } catch {
            throw error;
        }
    }
}

export async function load(url, context, nextLoad) {
    if (!url.startsWith('file:')) return nextLoad(url, context);

    // The facade's own import of the real CommonJS module: load it untouched.
    if (new URL(url).searchParams.has(CJS_INTEROP)) return nextLoad(url, context);

    const filename = fileURLToPath(new URL(url));

    // Node has no native JSX support, so transform project source (components +
    // tests) on the fly. Everything else is left to Node.
    if (isProjectSource(filename)) {
        const { code } = await transform(await readFile(filename, 'utf8'), { ...SWC_OPTIONS, filename });

        return { format: 'module', source: code, shortCircuit: true };
    }

    const result = await nextLoad(url, context);

    // Give CommonJS dependencies the same `__esModule` interop the build gives
    // them. `nextLoad` reports the format but no source for CommonJS, so the
    // cheap text test needs its own read; it only runs for modules an ES module
    // imports directly, which is a handful per test file.
    if (result.format === 'commonjs' && (await readFile(filename, 'utf8').catch(() => '')).includes('__esModule')) {
        return { format: 'module', source: cjsInteropFacade(url), shortCircuit: true };
    }

    return result;
}
