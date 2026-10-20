const path = require('node:path');
const paths = require('../../../../paths.config');
const rspack = require('@rspack/core');
const ImageMinimizerPlugin = require('../../plugins/image-minimizer-plugin');

module.exports = {
    entry: { css: path.resolve(__dirname, '../../entry/css.js') },
    target: 'node',
    // css-loader (with url:false) + CssExtractRspackPlugin own CSS handling, so
    // disable Rspack's native CSS. url:false leaves every url() reference
    // untouched — e.g. url(/static/img/x.png) is emitted verbatim and served
    // from the copied static assets, rather than being resolved as a module.
    // (Rspack native CSS cannot passthrough absolute urls — see rspack #4518.)
    experiments: {
        css: false
    },
    stats: {
        modules: false,
        entrypoints: false
    },
    module: {
        rules: [
            {
                test: /\.(ico)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf)([?]?.*)$/,
                dependency: { not: ['url'] },
                type: 'asset/resource',
                generator: {
                    filename: `${paths.dest.assets}/fonts/[name][ext]`,
                    publicPath: `/${paths.dest.assets}/fonts/`
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: rspack.CssExtractRspackPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    //for sass/scss support
                    // {
                    //     loader: 'sass-loader',
                    //     options: {
                    //         implementation: require('sass-embedded'),
                    //         sassOptions: {
                    //             api: 'legacy'
                    //         }
                    //     }
                    // }
                ],
                type: 'javascript/auto'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'asset',
            }
        ]
    },
    plugins: [
        new rspack.CssExtractRspackPlugin({
            filename: path.join(paths.dest.css, 'index.css'),
            chunkFilename: '[id].css',
            ignoreOrder: false,
        })
    ],
    optimization: {
        minimizer: [
            new ImageMinimizerPlugin({
                // sharp encode options for raster formats
                sharp: {
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
                // svgo options for svg
                svgo: {
                    // Pass over SVGs multiple times to ensure all optimizations are applied. False by default
                    multipass: true,
                    plugins: [{
                        // set of built-in plugins enabled by default
                        // see: https://svgo.dev/docs/preset-default/
                        name: 'preset-default',
                    }],
                },
            }),
        ],
    }
};
