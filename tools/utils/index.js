import fs from 'fs';
import path from 'path';

export const walker = (base, dir) => {
    const baseDir = path.join(base, dir);
    const walk = (dir, filelist = []) => {
        fs.readdirSync(dir).forEach(file => {
            filelist = fs.statSync(path.join(dir, file)).isDirectory()
                ? walk(path.join(dir, file), filelist)
                : filelist.concat({ name: file, path: dir.split(baseDir)[1] });
        });
        return filelist;
    };
    return walk(path.join(base, dir));
};