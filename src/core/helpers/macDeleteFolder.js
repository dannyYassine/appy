/**
 * Created by dannyyassine on 2017-06-25.
 */

const { exec } = require('child_process');

const removeDirectory = function (path, callback) {
    exec(`rm -rf ${path}`, (error, stdout, stderr) => {
        callback(error);
    });
};

const removeContentsOfDirectory = function (path, callback) {
    exec(`rm -rf ${path}/*`, (error, stdout, stderr) => {
        callback(error);
    });
};

module.exports = {
    removeDirectory,
    removeContentsOfDirectory
};