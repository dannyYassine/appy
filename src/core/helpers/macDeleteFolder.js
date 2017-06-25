/**
 * Created by dannyyassine on 2017-06-25.
 */

const { exec } = require('child_process');

const rmDir = function (path, callback) {
    exec(`rm -rf ${path}`, (error, stdout, stderr) => {
        callback(error);
    });
};

module.exports = rmDir;