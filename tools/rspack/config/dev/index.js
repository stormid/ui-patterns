const base = require('../base');
const path = require('node:path');
const { merge } = require('../../../utils');
const rspack = require('@rspack/core');
const paths = require('../../../../paths.config');

module.exports = [
    merge(base.html, {
        output: {
            filename: '[name].js',
            path: path.join(process.cwd(), paths.output),
            publicPath: '/',
            library: { type: 'umd' },
            assetModuleFilename: 'fonts/[name][ext]'
            // No `clean` here: all three dev compilers emit into `build/` and
            // share the dev server's in-memory filesystem, so cleaning would
            // wipe the JS/CSS compilers' assets (e.g. /static/js/index.js → 404).
        },
        mode: 'development',
        devtool: 'source-map',
        devServer: {
            static: path.join(process.cwd(), paths.output, paths.dest.assets),
            // Pick the first free port (from 8080) so `npm start` never fails on
            // an in-use port; the chosen URL is printed to the console.
            port: 'auto',
            // Open a browser window at the served URL on start.
            open: true,
            // HMR is disabled deliberately: pages are server-rendered to static
            // HTML by the (node-target) html compiler, so there are no client
            // modules to hot-swap. With `hot: true` the dev-server client always
            // takes the HMR branch and never falls back to a reload, so template/
            // component/CSS edits never reach the browser. `hot: false` lets
            // liveReload do a full page reload on every recompile instead.
            hot: false,
            liveReload: true,
            // Watch source that isn't in a compiler graph the browser observes,
            // so CSS-only edits also trigger the reload.
            watchFiles: ['src/css/**/*']
        }
    }),
    merge(base.css, {
        output: {
            filename: '[name].js',
            path: path.join(process.cwd(), paths.output),
            library: { type: 'umd' },
            assetModuleFilename: 'fonts/[name][ext]'
        },
        mode: 'production',
        plugins: [
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
    }),
    merge(base.javascript, {
        output: {
            filename: '[name].js',
            chunkFilename: `[name].[chunkhash].js`,
            publicPath: paths.webpackPublicPath,
            path: path.join(process.cwd(), paths.output)
        },
        mode: 'development',
        devtool: 'eval-source-map'
    })
];
