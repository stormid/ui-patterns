const path = require('path');
const paths = require(path.join(process.cwd(), `./paths.config`));

module.exports = {
    entry: {
        polyfills: path.join(process.cwd(), `${paths.src.js}/polyfills/index.js`)
    },
    target: 'web',
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
            }
        ]
    }
};