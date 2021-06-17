/*
* @params baseDir, String, directory relative to project root
* @returns Array of paths describing directory structure without filenames based on contents of src/template/pages
*/
const getPaths = baseDir => {
    const fs = require('fs');
    const path = require('path');
    const folder = path.resolve(__dirname, `../../../${baseDir}`);
    const read = dir => {
        const contents = fs.readdirSync(dir);
        return contents.reduce((files, file) => fs.statSync(path.resolve(__dirname, path.join(dir, file))).isDirectory()
            ? files.concat(read(path.join(dir, file)))
            : files.concat(path.join(dir, file).replace(/(index)?\.js/, '')),
        []);
    };
    
    return read(folder).map(file => path.relative(baseDir, file).split(path.sep).join('/'));
};

module.exports = {
    getPaths
};