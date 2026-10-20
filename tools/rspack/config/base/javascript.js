const path = require('node:path');
const paths = require(path.join(process.cwd(), `./paths.config`));
const rspack = require('@rspack/core');

module.exports = {
    // Only the main bundle is built by default. Application Insights is added
    // by the integration (ci/watch) config alone — it reports to Azure, so it
    // is dead weight in a local dev build and in a static-site `build`.
    entry: {
        index: path.join(process.cwd(), `${paths.src.js}/index.js`)
    },
    target: 'browserslist',
    stats: {
        modules: false,
        entrypoints: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'builtin:swc-loader',
                options: {
                    jsc: {
                        parser: {
                            syntax: 'ecmascript',
                            jsx: true
                        }
                    },
                    // empty env => SWC reads browser targets from .browserslistrc
                    env: {}
                },
                type: 'javascript/auto'
            }
        ]
    },
    optimization: {
        splitChunks: {
            enforceSizeThreshold: 0,
        },
        minimizer: [
            new rspack.SwcJsMinimizerRspackPlugin({
                minimizerOptions: {
                    format: {
                        comments: false,
                    }
                }
            })
        ]
    },
};
