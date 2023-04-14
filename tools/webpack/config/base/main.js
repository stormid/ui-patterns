const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, '../../plugins/static-entry.js'),
    target: 'node',
    stats: {
        modules: false,
        entrypoints: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(ico)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /\.(s)?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                            sourceMap: true
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: false,
                            },
                        },
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '@constants': path.join(process.cwd(), 'src/templates/constants/'),
            '@templates': path.join(process.cwd(), 'src/templates/'),
            '@layouts': path.join(process.cwd(), 'src/templates/layouts'),
            '@components': path.join(process.cwd(), 'src/templates/components'),
        }
    }
};