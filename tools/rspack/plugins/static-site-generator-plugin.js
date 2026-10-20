const vm = require('node:vm');
const Module = require('node:module');
const { Compilation, sources } = require('@rspack/core');
const RawSource = sources.RawSource;

// Evaluate a compiled CommonJS/UMD bundle in-process and return its exports.
// Rspack 2 doesn't expose `compilation.executeModule` as a callable method, so
// the SSG still runs the emitted html bundle — but via Node's built-in vm
// rather than a third-party eval package. The bundle is self-contained (the
// `node` target inlines its dependencies); `require`/`__dirname` are provided
// for the rare built-in reference.
const evaluateModule = (source, filename, dirname) => {
    const wrapped = vm.runInThisContext(
        `(function (exports, require, module, __filename, __dirname) {\n${source}\n})`,
        { filename }
    );
    const mod = { exports: {} };
    wrapped(mod.exports, Module.createRequire(filename), mod, filename, dirname);
    return mod.exports;
};

const toError = err => (err instanceof Error ? err : new Error(typeof err === 'string' ? err : String(err)));

class StaticSiteGeneratorPlugin {
    constructor(options) {
        options = options || {};
        this.entry = options.entry;
        // Kept unresolved: `paths` may be a function, which is re-invoked on
        // every compilation (see resolvePaths). That is what lets a page added
        // while the dev server is running be rendered without a restart — a
        // fixed array would freeze the page list at config-load time.
        this.paths = options.paths;
    }

    resolvePaths() {
        const paths = typeof this.paths === 'function' ? this.paths() : this.paths;

        return Array.isArray(paths) ? paths : [paths || '/'];
    }

    apply(compiler) {
        const pluginName = 'StaticSiteGeneratorPlugin';

        compiler.hooks.thisCompilation.tap(pluginName, compilation => {
            compilation.hooks.processAssets.tapPromise(
                {
                    name: pluginName,
                    stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
                },
                async () => {
                    // Rspack omits assetsByChunkName from the default toJson() output,
                    // so request asset + chunk-group info explicitly.
                    const webpackStatsJson = compilation.getStats().toJson({ all: false, assets: true, chunkGroups: true });

                    try {
                        const asset = findAsset(this.entry, compilation, webpackStatsJson);

                        if (asset === null) {
                            throw new Error('Source file not found: "' + this.entry + '"');
                        }

                        const source = asset.source();
                        const filename = `${compiler.context}/${this.entry}.js`;
                        let render = evaluateModule(source, filename, compiler.context);

                        if (Object.prototype.hasOwnProperty.call(render, 'default')) {
                            render = render.default;
                        }

                        if (typeof render !== 'function') {
                            throw new Error(
                                'Export from "' +
                                    this.entry +
                                    '" must be a function that returns an HTML string. Is output.library.type in the configuration set to "umd"?'
                            );
                        }
                        await renderPaths(this.resolvePaths(), render, compilation);
                    } catch (err) {
                        compilation.errors.push(toError(err));
                    }
                }
            );
        });
    }
}

async function renderPaths(paths, render, compilation) {
    const renderPromises = paths.map(async outputPath => {
        try {
            const output = await render({ path: outputPath });
            const outputByPath = typeof output === 'object' ? output : makeObject(outputPath, output);

            Object.keys(outputByPath).forEach(key => {
                const rawSource = outputByPath[key];
                const assetName = pathToAssetName(key);

                if (compilation.getAsset(assetName)) return;
                if (rawSource === '') return;

                compilation.emitAsset(assetName, new RawSource(rawSource));
            });
        } catch (err) {
            compilation.errors.push(toError(err));
        }
    });

    return await Promise.all(renderPromises);
}

const findAsset = (src, compilation, webpackStatsJson) => {
    const assetsByChunkName = webpackStatsJson.assetsByChunkName || {};

    if (!src) {
        src = Object.keys(assetsByChunkName)[0];
    }
    const asset = compilation.assets[src];

    if (asset) {
        return asset;
    }

    let chunkValue = assetsByChunkName[src];

    if (!chunkValue) {
        return null;
    }
    // Webpack outputs an array for each chunk when using sourcemaps.
    // Under the dev server, HMR also injects a `*.hot-update.js` delta and
    // lists it *before* the real bundle — that delta exports the HMR runtime
    // payload, not the render function, so skip it and take the real bundle.
    if (Array.isArray(chunkValue)) {
        chunkValue = chunkValue.find(filename => filename.endsWith('.js') && !filename.includes('.hot-update.'));
    }
    return compilation.assets[chunkValue];
};

const pathToAssetName = outputPath => {
    const name = outputPath.replace(/^(\/|\\)/, ''); // strip leading slash for the dev server

    // Already an explicit .html/.htm filename.
    if (/\.html?$/i.test(name)) return name;

    // A directory (trailing slash) or the site root ('') maps to a directory
    // index — `about/` -> `about/index.html`, '' -> `index.html`. This is how
    // `<dir>/index.js` page files get pretty URLs.
    if (name === '' || name.endsWith('/')) return `${name}index.html`;

    // A bare page file maps to a same-named html file — `404` -> `404.html`,
    // `offline` -> `offline.html`. Use this (e.g. `pages/404.js`) for files a
    // host serves directly, like a 404 page.
    return `${name}.html`;
};

const makeObject = (key, value) => {
    let obj = {};
    obj[key] = value;
    return obj;
};

module.exports = StaticSiteGeneratorPlugin;
// Exposed for unit testing — see tools/rspack/plugins/__tests__.
module.exports.pathToAssetName = pathToAssetName;
