const RawSource = require('webpack-sources').RawSource;
const evaluate = require('eval');
const path = require('path');
const { Compilation } = require('webpack');

class StaticSiteGeneratorWebpackPlugin {
    constructor(options) {
        options = options || {};
        this.entry = options.entry;
        this.paths = Array.isArray(options.paths) ? options.paths : [options.paths || '/'];
        this.locals = options.locals;
        this.globals = options.globals;
    }

    apply(compiler) {
        const pluginName = 'StaticSiteGeneratorWebpackPlugin';

        compiler.hooks.thisCompilation.tap(pluginName, compilation => {
            compilation.hooks.processAssets.tapPromise(
                {
                    name: pluginName,
                    stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
                },
                async () => {
                    const webpackStats = compilation.getStats();
                    const webpackStatsJson = webpackStats.toJson();

                    try {
                        const asset = findAsset(this.entry, compilation, webpackStatsJson);

                        if (asset === null) {
                            throw new Error('Source file not found: "' + this.entry + '"');
                        }

                        const assets = getAssetsFromCompilation(compilation, webpackStatsJson);

                        const source = asset.source();
                        let render = evaluate(source, /* filename: */ this.entry, /* scope: */ this.globals, /* includeGlobals: */ true);

                        if (Object.prototype.hasOwnProperty.call(render, 'default')) {
                            render = render.default;
                        }

                        if (typeof render !== 'function') {
                            throw new Error(
                                'Export from "' +
                                    this.entry +
                                    '" must be a function that returns an HTML string. Is output.libraryTarget in the configuration set to "umd"?'
                            );
                        }
                        await renderPaths(this.locals, this.paths, render, assets, webpackStats, compilation);
                    } catch (err) {
                        compilation.errors.push(err.stack);
                    }
                }
            );
        });
    }
}

async function renderPaths(userLocals, paths, render, assets, webpackStats, compilation) {
    const renderPromises = paths.map(async outputPath => {
        const locals = {
            path: outputPath,
            assets,
            webpackStats,
        };

        for (const prop in userLocals) {
            if (Object.prototype.hasOwnProperty.call(userLocals, prop)) {
                locals[prop] = userLocals[prop];
            }
        }

        try {
            const renderPromise = render.length < 2
                ? Promise.resolve(render(locals))
                : Promise.fromNode(render.bind(null, locals));
            return renderPromise.then(output => {
                const outputByPath = typeof output === 'object' ? output : makeObject(outputPath, output);
                const assetGenerationPromises = Object.keys(outputByPath).map(key => {
                    const rawSource = outputByPath[key];
                    const assetName = pathToAssetName(key);

                    if (compilation.assets[assetName]) return;
                    if (rawSource === '') return;

                    compilation.assets[assetName] = new RawSource(rawSource);
                });

                return Promise.all(assetGenerationPromises);
            });

           
        } catch (err) {
            compilation.errors.push(err.stack);
        }
    });

    return await Promise.all(renderPromises);
}

const findAsset = (src, compilation, webpackStatsJson) => {
    if (!src) {
        const chunkNames = Object.keys(webpackStatsJson.assetsByChunkName);
        src = chunkNames[0];
    }
    const asset = compilation.assets[src];

    if (asset) {
        return asset;
    }

    let chunkValue = webpackStatsJson.assetsByChunkName[src];

    if (!chunkValue) {
        return null;
    }
    // Webpack outputs an array for each chunk when using sourcemaps
    if (chunkValue instanceof Array) {
        // Is the main bundle always the first element?
        chunkValue = chunkValue.find(filename => /\.js$/.test(filename));
    }
    return compilation.assets[chunkValue];
};

// Shamelessly stolen from html-webpack-plugin - Thanks @ampedandwired :)
const getAssetsFromCompilation = (compilation, webpackStatsJson) => {
    const assets = {};
    for (const chunk in webpackStatsJson.assetsByChunkName) {
        let chunkValue = webpackStatsJson.assetsByChunkName[chunk];
        // Webpack outputs an array for each chunk when using sourcemaps
        if (chunkValue instanceof Array) {
            // Is the main bundle always the first JS element?
            chunkValue = chunkValue.find(filename => /\.js$/.test(filename));
        }

        if (compilation.options.output.publicPath) {
            chunkValue = compilation.options.output.publicPath + chunkValue;
        }
        assets[chunk] = chunkValue;
    }

    return assets;
};

const pathToAssetName = outputPath => {
    let outputFileName = outputPath.replace(/^(\/|\\)/, ''); // Remove leading slashes for webpack-dev-server

    if (!/\.(html?)$/i.test(outputFileName)) {
        outputFileName = path.join(outputFileName, 'index.html');
    }

    return outputFileName;
};

const makeObject = (key, value) => {
    let obj = {};
    obj[key] = value;
    return obj;
};

module.exports = StaticSiteGeneratorWebpackPlugin;
