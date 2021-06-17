const RawSource = require('webpack-sources/lib/RawSource');
const evaluate = require('eval');
const path = require('path');
const Promise = require('bluebird');

function StaticSiteGeneratorWebpackPlugin(options) {
    options = options || {};

    this.entry = options.entry;
    this.paths = Array.isArray(options.paths) ? options.paths : [options.paths || '/'];
    this.locals = options.locals;
    this.globals = options.globals;
}

StaticSiteGeneratorWebpackPlugin.prototype.apply = function(compiler) {
    let self = this;
    addThisCompilationHandler(compiler, compilation => {
        addOptimizeAssetsHandler(compilation, (_, done) => {
            const webpackStats = compilation.getStats();
            const webpackStatsJson = webpackStats.toJson();

            try {
                const asset = findAsset(self.entry, compilation, webpackStatsJson);

                if (asset === null) {
                    throw new Error('Source file not found: "' + self.entry + '"');
                }

                const assets = getAssetsFromCompilation(compilation, webpackStatsJson);

                const source = asset.source();
                let render = evaluate(source, /* filename: */ self.entry, /* scope: */ self.globals, /* includeGlobals: */ true);
                
                if (Object.prototype.hasOwnProperty.call(render, 'default')) {
                    render = render.default;
                }

                if (typeof render !== 'function') {
                    throw new Error('Export from "' + self.entry + '" must be a function that returns an HTML string. Is output.libraryTarget in the configuration set to "umd"?');
                }

                renderPaths(self.locals, self.paths, render, assets, webpackStats, compilation)
                    .nodeify(done);
            } catch (err) {
                compilation.errors.push(err.stack);
                done();
            }
        });
    });
};

function renderPaths(userLocals, paths, render, assets, webpackStats, compilation) {
    const renderPromises = paths.map(outputPath => {
        const locals = {
            path: outputPath,
            assets,
            webpackStats
        };

        for (const prop in userLocals) {
            if (Object.prototype.hasOwnProperty.call(userLocals, prop)) {
                locals[prop] = userLocals[prop];
            }
        }

        const renderPromise = render.length < 2
            ? Promise.resolve(render(locals))
            : Promise.fromNode(render.bind(null, locals));

        return renderPromise
            .then(output => {
                const outputByPath = typeof output === 'object' ? output : makeObject(outputPath, output);
                const assetGenerationPromises = Object.keys(outputByPath).map(key => {
                    const rawSource = outputByPath[key];
                    const assetName = pathToAssetName(key);

                    if (compilation.assets[assetName]) return;
                    if (rawSource === '') return;

                    compilation.assets[assetName] = new RawSource(rawSource);
                });

                return Promise.all(assetGenerationPromises);
            })
            .catch(err => {
                compilation.errors.push(err.stack);
            });
    });

    return Promise.all(renderPromises);
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

const addThisCompilationHandler = (compiler, callback) => {
    if (compiler.hooks) {
        /* istanbul ignore next */
        compiler.hooks.thisCompilation.tap('static-site-generator-webpack-plugin', callback);
    } else {
        compiler.plugin('this-compilation', callback);
    }
};

function addOptimizeAssetsHandler(compilation, callback) {
    if (compilation.hooks) {
        /* istanbul ignore next */
        compilation.hooks.optimizeAssets.tapAsync('static-site-generator-webpack-plugin',callback);
    } else {
        compilation.plugin('optimize-assets', callback);
    }
}

module.exports = StaticSiteGeneratorWebpackPlugin;
