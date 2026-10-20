const base = require('../base');
const path = require('node:path');
const { merge } = require('../../../utils');
const rspack = require('@rspack/core');
const { cssMinimizer } = require('../css-minimizer');
const DeleteAssetsPlugin = require('../../plugins/delete-assets-plugin');
const paths = require('../../../../paths.config');

module.exports = [
    merge(base.css, {
        output: {
            filename: '[name].js',
            path: path.join(process.cwd(), paths.integrationOutput),
            library: { type: 'umd' }
        },
        mode: 'production',
        plugins: [
            new DeleteAssetsPlugin({ assets: ['css.js'] }),
            new rspack.CopyRspackPlugin({
                patterns: [
                    {
                        from: path.join(process.cwd(), paths.src.img),
                        to: path.join(process.cwd(), paths.integrationOutput, paths.dest.img),
                        noErrorOnMissing: true
                    },
                    {
                        from: path.join(process.cwd(), paths.src.assets),
                        to: path.join(process.cwd(), paths.integrationOutput, paths.dest.assets),
                        noErrorOnMissing: true
                    }
                ]
            })
        ],
        optimization: {
            minimizer: [
                cssMinimizer()
            ]
        }
    }),
    merge(base.javascript, {
        // Client-side telemetry, built for the server-rendered app only. The
        // backend is responsible for referencing appinsights.js and rendering
        // an element carrying the connection string in a `data-ai` attribute
        // (see docs/making-websites/javascript.md); without that element the
        // script initialises nothing.
        entry: {
            appinsights: path.join(process.cwd(), `${paths.src.js}/appinsights/index.js`)
        },
        output: {
            filename: '[name].js',
            chunkFilename: `[name].[chunkhash].js`,
            publicPath: paths.webpackPublicPath,
            path: path.join(process.cwd(), paths.integrationOutput, paths.dest.js),
            clean: true
        },
        mode: 'production'
    })
];
