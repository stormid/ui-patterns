const base = require('../base');
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const StaticSiteGeneratorPlugin = require('../../plugins/static-site-generator-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { getPaths } = require('../../utils');
const paths = require('../../../../paths.config');

module.exports = [
    merge(base.main, {
        output: {
            filename: 'static-entry.js',
            path: path.join(process.cwd(), paths.output),
            libraryTarget: 'umd'
        },
        mode: 'production',
        plugins: [
            new StaticSiteGeneratorPlugin({
                paths: getPaths(paths.src.templates)
            }),
            new FileManagerPlugin({
                onEnd: {
                    delete: [ path.join(process.cwd(), paths.output, 'static-entry.js') ]
                }
            }),
            new MiniCssExtractPlugin({
                filename: path.join(paths.dest.css, 'index.css'),
                chunkFilename: '[id].css',
                ignoreOrder: false,
            }),
            new CopyWebpackPlugin([{
                from: path.join(process.cwd(), paths.src.assets),
                to: path.join(process.cwd(), paths.output, paths.dest.assets)
            }]),
            new CopyWebpackPlugin([{
                from: path.join(process.cwd(), paths.src.img),
                to: path.join(process.cwd(), paths.output, paths.dest.img)
            }]),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 5
            }),
            new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
        ],
    }),
    merge(base.javascript, {
        output: {
            filename: '[name].js',
            publicPath: paths.webpackPublicPath,
            path: path.join(process.cwd(), paths.output, paths.dest.js)
        },
        mode: 'production',
        performance: {
            hints: 'warning'
        },
        plugins: [
            new CleanWebpackPlugin()
        //     new CopyWebpackPlugin([{
        //         from: path.resolve(__dirname, '../../../../src/js/async'),
        //         to: path.resolve(__dirname, `../../../../build/static/js/async`)
        //     }])
        ]
    })
];