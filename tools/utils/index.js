/*
* @params baseDir, String, directory relative to the current working directory
* (i.e. the project root, the same base the Rspack configs and paths.config.js
* resolve against — an absolute path is also accepted)
* @returns Array of paths describing directory structure without filenames based on contents of src/template/pages
*/
const getPaths = baseDir => {
    const fs = require('node:fs');
    const path = require('node:path');
    const folder = path.resolve(process.cwd(), baseDir);
    const read = dir => {
        const contents = fs.readdirSync(dir);
        return contents.reduce((files, file) => {
            const full = path.join(dir, file);
            return fs.statSync(full).isDirectory()
                ? files.concat(read(full))
                : files.concat(full);
        }, []);
    };

    return read(folder)
        .filter(file => file.endsWith('.js'))
        .map(file => {
            const rel = path.relative(folder, file).split(path.sep).join('/');
            // An `index.js` is a directory index, so emit a trailing slash
            // (the root `index.js` becomes '') — pathToAssetName then produces
            // `<dir>/index.html` and the page gets a pretty URL. Any other file
            // keeps its own name for `<dir>/<filename>.html`.
            return rel.replace(/(^|\/)index\.js$/, '$1').replace(/\.js$/, '');
        });
};

const isObject = value => value && typeof value === 'object' && !Array.isArray(value);

/*
* Deep-merges a base config with an override config:
*   - plain objects are merged recursively
*   - arrays are concatenated (base first), e.g. plugins / optimization.minimizer
*   - everything else (scalars) is overwritten by the override
* Returns a new top-level object; arrays are new (concat) so the base config is
* never mutated. Replaces the equivalent default behaviour of webpack-merge.
*/
const merge = (base, override) => {
    const result = { ...base };
    for (const key of Object.keys(override)) {
        const baseValue = base[key];
        const overrideValue = override[key];
        if (Array.isArray(baseValue) && Array.isArray(overrideValue)) {
            result[key] = [...baseValue, ...overrideValue];
        } else if (isObject(baseValue) && isObject(overrideValue)) {
            result[key] = merge(baseValue, overrideValue);
        } else {
            result[key] = overrideValue;
        }
    }
    return result;
};

module.exports = {
    getPaths,
    merge
};