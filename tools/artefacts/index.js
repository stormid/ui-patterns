// require modules
import fs from 'fs';
import archiver from 'archiver';

// create a file to stream archive data to.
// var output = fs.createWriteStream(__dirname + '/example.zip');
// var archive = archiver('zip', {
//   zlib: { level: 9 } // Sets the compression level.
// });
const output = fs.createWriteStream('./artefacts.zip');
const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});


// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on('close', () => {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
});

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
output.on('end', () => {
    console.log('Data has been drained');
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', err => {
    if (err.code === 'ENOENT') {
        // log warning
    } else {
        // throw error
        throw err;
    }
});

// good practice to catch this error explicitly
archive.on('error', err => {
    throw err;
});

// pipe archive data to the file
archive.pipe(output);

// append files from a sub-directory and naming it `new-subdir` within the archive
archive.directory('build/', false);

// finalize the archive (ie we are done appending files but streams have to finish yet)
// 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
archive.finalize();