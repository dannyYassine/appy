/**
 * Created by dannyyassine on 2017-06-20.
 */

const fs = require('fs');

const rmDir = (function() {

    const removeDirectory = function(dirPath) {
        try { var files = fs.readdirSync(dirPath); }
        catch(e) { return; }
        if (files.length > 0)
            for (var i = 0; i < files.length; i++) {
                var filePath = dirPath + '/' + files[i];
                if (fs.statSync(filePath).isFile())
                    fs.unlinkSync(filePath);
                else
                    removeDirectory(filePath);
            }
        fs.rmdirSync(dirPath);
    };

    const removeContentsOfDirectory = function(dirPath) {
        try { var files = fs.readdirSync(dirPath); }
        catch(e) { return; }
        if (files.length > 0)
            for (var i = 0; i < files.length; i++) {
                var filePath = dirPath + '/' + files[i];
                if (fs.statSync(filePath).isFile())
                    fs.unlinkSync(filePath);
                else
                    removeContentsOfDirectory(filePath);
            }
    };

    return {
        removeContentsOfDirectory,
        removeDirectory
    }

}());

module.exports = rmDir;