const rspack = require('@rspack/core');
const browserslist = require('browserslist');

// Browser query from .browserslistrc — Lightning CSS resolves it with its own
// bundled caniuse data, then prefixes and downlevels CSS for those targets.
// Pass the query (not browserslist()'s resolved versions, which Lightning CSS's
// older data can fail to parse). Keeps .browserslistrc the single source of
// truth for CSS browser support, alongside SWC for JavaScript.
const targets = (browserslist.findConfig(process.cwd()) || {}).defaults || ['defaults'];

/*
 * A fresh Lightning CSS minimizer instance for the production-asset builds
 * (build + integration). Dev intentionally ships unminified CSS, so it does
 * not use this.
 */
const cssMinimizer = () => new rspack.LightningCssMinimizerRspackPlugin({
    minimizerOptions: { targets }
});

module.exports = { cssMinimizer };
