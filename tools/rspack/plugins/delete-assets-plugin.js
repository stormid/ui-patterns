const { Compilation } = require('@rspack/core');

/*
 * Removes named emitted assets before they are written to disk.
 * Used to drop the throwaway JS bundles produced by the `node`-targeted
 * html and css compilers (html.js, css.js, main.js) — only the generated
 * HTML and the extracted CSS are wanted in the output.
 *
 * Runs at PROCESS_ASSETS_STAGE_REPORT (the latest stage) so it fires after
 * the StaticSiteGeneratorPlugin has read the html bundle source at
 * PROCESS_ASSETS_STAGE_ADDITIONAL.
 */
class DeleteAssetsPlugin {
    constructor(options = {}) {
        this.assets = options.assets || [];
    }

    apply(compiler) {
        const pluginName = 'DeleteAssetsPlugin';

        compiler.hooks.thisCompilation.tap(pluginName, compilation => {
            compilation.hooks.processAssets.tap(
                {
                    name: pluginName,
                    stage: Compilation.PROCESS_ASSETS_STAGE_REPORT,
                },
                () => {
                    this.assets.forEach(name => {
                        if (compilation.getAsset(name)) {
                            compilation.deleteAsset(name);
                        }
                    });
                }
            );
        });
    }
}

module.exports = DeleteAssetsPlugin;
