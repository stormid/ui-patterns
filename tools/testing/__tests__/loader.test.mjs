import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { load, resolve } from '../loader.mjs';

// The fixtures are imported the way a source module would import a dependency,
// so the `__esModule` interop is exercised through a real import rather than by
// calling the hooks — that is the boundary the divergence lives on.
import flagged, { named as flaggedNamed } from '../fixtures/interop/es-module-flag.cjs';
import plain from '../fixtures/interop/plain.cjs';

const url = relativePath => pathToFileURL(join(process.cwd(), relativePath)).href;

// Stand-ins for the next hook in the chain. They return a marker rather than
// doing any work, so a test can tell "the loader delegated" from "the loader
// handled it itself" without touching the filesystem.
const DELEGATED = { format: 'commonjs', source: null, delegated: true };
const nextLoad = () => DELEGATED;

const rejectingResolve = code => () => {
    const error = new Error(`stub failure: ${code}`);
    error.code = code;

    return Promise.reject(error);
};

/*
 * The transform must be anchored to this project's source directory. It used to
 * test `url.includes('/src/')`, which matches any checkout living under a
 * directory called `src` — the .NET layout <repo>/src/<Project>/Frontend is the
 * common case — and so swept every CommonJS dependency in node_modules into the
 * JSX transform, where a forced `format: 'module'` broke their default exports.
 */
test('load > leaves node_modules alone even under a path containing /src/', async () => {
    const foreign = 'file:///elsewhere/src/Acme.Web/Frontend/node_modules/lodash/index.js';

    assert.equal(await load(foreign, {}, nextLoad), DELEGATED);
});

test('load > leaves another project\'s src alone', async () => {
    const foreign = 'file:///elsewhere/src/Acme.Web/Frontend/src/js/index.js';

    assert.equal(await load(foreign, {}, nextLoad), DELEGATED);
});

test('load > transforms JSX under this project\'s source root', async () => {
    const result = await load(url('src/templates/components/status/index.js'), {}, nextLoad);

    assert.equal(result.format, 'module');
    assert.match(result.source, /preact\/jsx-runtime/);
});

test('load > leaves the build\'s own CommonJS untransformed', async () => {
    assert.equal(await load(url('tools/utils/index.js'), {}, nextLoad), DELEGATED);
});

/*
 * Node does no extension or directory-index search inside a package with no
 * `exports` map; rspack does. Without the fallback, a source module importing a
 * design-system component by its extensionless path cannot be tested at all.
 */
test('resolve > falls back to CommonJS resolution for an extensionless package subpath', async () => {
    const result = await resolve(
        '@stormid/toggle/dist/index',
        { parentURL: import.meta.url },
        rejectingResolve('ERR_MODULE_NOT_FOUND')
    );

    assert.match(result.url, /@stormid\/toggle\/dist\/index\.js$/);
});

test('resolve > falls back for a directory subpath', async () => {
    const result = await resolve(
        '@stormid/toggle/dist',
        { parentURL: import.meta.url },
        rejectingResolve('ERR_UNSUPPORTED_DIR_IMPORT')
    );

    assert.match(result.url, /@stormid\/toggle\/dist\/index\.js$/);
});

// The fallback must not become a way around a package's `exports` map: rspack
// honours `exports` too, so a subpath a package withholds has to stay withheld.
test('resolve > rethrows a withheld exports subpath rather than working around it', async () => {
    await assert.rejects(
        () => resolve('preact/hooksss', { parentURL: import.meta.url }, rejectingResolve('ERR_PACKAGE_PATH_NOT_EXPORTED')),
        { code: 'ERR_PACKAGE_PATH_NOT_EXPORTED' }
    );
});

test('resolve > resolves the build\'s path aliases', async () => {
    const result = await resolve('@components/status', { parentURL: import.meta.url }, rejectingResolve('ERR_MODULE_NOT_FOUND'));

    assert.match(result.url, /src\/templates\/components\/status\/index\.js$/);
});

/*
 * Rspack unwraps the `default` of a CommonJS module marked `__esModule`; native
 * ESM hands over the whole `module.exports`. Left alone, a source module would
 * silently see a different value in a test than in the build.
 */
test('interop > unwraps the default of a CommonJS module marked __esModule', () => {
    assert.equal(typeof flagged, 'function');
    assert.equal(flagged(), 'default export');
});

test('interop > keeps the named exports of an unwrapped module', () => {
    assert.equal(flaggedNamed(), 'named export');
});

test('interop > leaves CommonJS without an __esModule marker untouched', () => {
    assert.equal(typeof plain, 'object');
    assert.equal(plain.named(), 'named export');
});
