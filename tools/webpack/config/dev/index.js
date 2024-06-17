const base = require('../base');
const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const StaticSiteGeneratorPlugin = require('../../plugins/static-site-generator-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-v3-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { getPaths } = require('../../utils');
const paths = require('../../../../paths.config');

module.exports = [
    merge(base.main, {
        output: {
            filename: '[name].js',
            path: path.join(process.cwd(), paths.output),
            publicPath: '/',
            libraryTarget: `umd`,
            assetModuleFilename: 'fonts/[name][ext]'
        },
        mode: 'development',
        devtool: 'source-map',
        devServer: {
            static: path.join(process.cwd(), paths.output, paths.dest.assets),
            port: 8081
        },
        module: {
            rules: [
                {
                    test: /\.(s)?css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: require('sass-embedded'),
                                sourceMap: true,
                                sassOptions: {
                                    api: 'modern-compiler'
                                }
                            },
                        }
                    ]
                },
                {
                    test: /\.(eot|woff|woff2|svg|ttf)([?]?.*)$/,
                    dependency: { not: ['url'] },
                    loader: 'file-loader',
                    options: {
                        outputPath: `${paths.dest.assets}/fonts`,
                        publicPath: `/${paths.dest.assets}/fonts`,
                        esModule: false
                    },
                    type: 'javascript/auto'
                }
            ]
        },
        plugins: [
            new webpack.IgnorePlugin({ resourceRegExp: /\.mdx$/, }),
            new StaticSiteGeneratorPlugin({
                paths: getPaths(paths.src.templates)
            }),
            new MiniCssExtractPlugin({
                filename: 'index.css',
                chunkFilename: '[id].css',
                ignoreOrder: false,
            }),
            new CopyWebpackPlugin({
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
            }),
            new CleanWebpackPlugin(),
            new BrowserSyncPlugin(
                {
                    host: 'localhost',
                    port: 3000,
                    proxy: 'http://localhost:8081/'
                }
            )
        ],
        optimization: {
            minimizer: [
                new ImageMinimizerPlugin({
                    minimizer: {
                        implementation: ImageMinimizerPlugin.sharpMinify,
                        options: {
                            encodeOptions: {
                                jpeg: {
                                    // https://sharp.pixelplumbing.com/api-output#jpeg
                                    quality: 80,
                                },
                                webp: {
                                    // https://sharp.pixelplumbing.com/api-output#webp
                                    quality: 80,
                                },
                                avif: {
                                    // https://sharp.pixelplumbing.com/api-output#avif
                                    quality: 50,
                                },
            
                                // png by default sets the quality to 100%, which is same as lossless
                                // https://sharp.pixelplumbing.com/api-output#png
                                png: {},
            
                                // gif does not support lossless compression at all
                                // https://sharp.pixelplumbing.com/api-output#gif
                                gif: {},
                            },
                        },
                    },
                }),
                new ImageMinimizerPlugin({
                    minimizer: {
                        implementation: ImageMinimizerPlugin.svgoMinify,
                        options: {
                            encodeOptions: {
                                // Pass over SVGs multiple times to ensure all optimizations are applied. False by default
                                multipass: true,
                                plugins: [
                                    // set of built-in plugins enabled by default
                                    // see: https://github.com/svg/svgo#default-preset
                                    'preset-default',
                                ],
                            },
                        },
                    },
                }),
            ],
        },
    }),
    merge(base.javascript, {
        output: {
            filename: '[name].js',
            publicPath: '/',
            path: path.join(process.cwd(), paths.output)
        },
        mode: 'development',
        devtool: 'eval-source-map'
    })
];