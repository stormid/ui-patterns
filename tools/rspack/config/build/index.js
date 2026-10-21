const base = require('../base');
const path = require('node:path');
const { merge } = require('../../../utils');
const rspack = require('@rspack/core');
const { cssMinimizer } = require('../css-minimizer');
const DeleteAssetsPlugin = require('../../plugins/delete-assets-plugin');
const paths = require('../../../../paths.config');

module.exports = [
    merge(base.html, {
        output: {
            filename: 'html.js',
            path: path.join(process.cwd(), paths.output),
            library: { type: 'umd' }
        },
        mode: 'production',
        plugins: [
            new DeleteAssetsPlugin({ assets: ['html.js', 'main.js'] })
        ]
    }),
    merge(base.css, {
        output: {
            filename: 'css.js',
            path: path.join(process.cwd(), paths.output),
            library: { type: 'umd' }
        },
        mode: 'production',
        plugins: [
            new DeleteAssetsPlugin({ assets: ['css.js'] }),
            new rspack.CopyRspackPlugin({
                patterns: [
                    {
                        from: path.join(process.cwd(), paths.src.img),
                        to: path.join(process.cwd(), paths.output, paths.dest.img),
                        noErrorOnMissing: true
                    },
                    {
                        from: path.join(process.cwd(), paths.src.assets),
                        to: path.join(process.cwd(), paths.output, paths.dest.assets),
                        noErrorOnMissing: true
                    }
                ]
            })
        ],
        optimization: {
            minimizer: [
                cssMinimizer()
            ],
        },
    }),
    merge(base.javascript, {
        output: {
            filename: '[name].js',
            chunkFilename: `[name].[chunkhash].js`,
            publicPath: paths.webpackPublicPath,
            path: path.join(process.cwd(), paths.output, paths.dest.js),
            clean: true
        },
        mode: 'production',
        performance: {
            hints: 'warning'
        }
    })
];
