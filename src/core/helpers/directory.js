/**
 * Created by dannyyassine on 2017-06-20.
 */

const fs = require('fs');

/**
 * Helper to remove directory or remove contents of director
 * @type {{removeContentsOfDirectory, removeDirectory}}
 */
const rmDir = (function() {

    /**
     * Remove entire directory at dirPath
     * @param dirPath
     */
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

    /**
     * Removes only the contents of the directory at dirPath
     * @param dirPath
     */
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