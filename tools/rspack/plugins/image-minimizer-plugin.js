const { Compilation, sources } = require('@rspack/core');

/*
 * Rspack-compatible image minimizer.
 *
 * image-minimizer-webpack-plugin cannot run under Rspack (it depends on the
 * webpack-only `Compilation.hooks.moduleAsset`), so this is a focused
 * replacement that re-encodes emitted image assets at the `optimize-size`
 * stage using the same engines the scaffold already depends on:
 *   - sharp for raster formats (jpeg/png/webp/avif/gif)
 *   - svgo  for svg
 *
 * Only emitted assets are processed (matching the original `minimizer` mode).
 * The re-encoded result is kept only when it is smaller than the original, so
 * optimisation can never enlarge an asset.
 */
const RASTER = /\.(jpe?g|png|webp|avif|gif)$/i;
const SVG = /\.svg$/i;

class ImageMinimizerPlugin {
    constructor(options = {}) {
        this.sharpOptions = options.sharp || {};
        this.svgoOptions = options.svgo || {};
    }

    apply(compiler) {
        const pluginName = 'ImageMinimizerPlugin';

        compiler.hooks.thisCompilation.tap(pluginName, compilation => {
            compilation.hooks.processAssets.tapPromise(
                {
                    name: pluginName,
                    stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
                },
                async () => {
                    const names = compilation.getAssets().map(asset => asset.name);

                    await Promise.all(names.map(async name => {
                        const cleanName = name.split('?')[0];
                        try {
                            if (RASTER.test(cleanName)) {
                                await this.minifyRaster(compilation, name, cleanName);
                            } else if (SVG.test(cleanName)) {
                                await this.minifySvg(compilation, name);
                            }
                        } catch (err) {
                            compilation.warnings.push(
                                new Error(`ImageMinimizerPlugin: failed to optimise "${name}": ${err.message}`)
                            );
                        }
                    }));
                }
            );
        });
    }

    async minifyRaster(compilation, name, cleanName) {
        const sharp = require('sharp');
        const ext = cleanName.split('.').pop().toLowerCase();
        const input = compilation.getAsset(name).source.buffer();

        let pipeline = sharp(input, { animated: ext === 'gif' });
        switch (ext) {
            case 'jpg':
            case 'jpeg':
                pipeline = pipeline.jpeg(this.sharpOptions.jpeg || {});
                break;
            case 'png':
                pipeline = pipeline.png(this.sharpOptions.png || {});
                break;
            case 'webp':
                pipeline = pipeline.webp(this.sharpOptions.webp || {});
                break;
            case 'avif':
                pipeline = pipeline.avif(this.sharpOptions.avif || {});
                break;
            case 'gif':
                pipeline = pipeline.gif(this.sharpOptions.gif || {});
                break;
            default:
                return;
        }

        const output = await pipeline.toBuffer();
        if (output.length < input.length) {
            compilation.updateAsset(name, new sources.RawSource(output));
        }
    }

    async minifySvg(compilation, name) {
        const { optimize } = require('svgo');
        const input = compilation.getAsset(name).source.source().toString();
        const result = optimize(input, this.svgoOptions);
        if (result.data && result.data.length < input.length) {
            compilation.updateAsset(name, new sources.RawSource(result.data));
        }
    }
}

module.exports = ImageMinimizerPlugin;
