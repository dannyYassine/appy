/**
 * Created by dannyyassine on 2017-06-25.
 */

const { removeContentsOfDirectory} = require('./../../../core/helpers/macDeleteFolder');
const projectFileSystem = require('./../services/projectFileSystem');

/**
 * Object to reset project workspace directory
 * @param project
 * @returns {Promise}
 */
exports.clearWorkspace = function(project) {
    return new Promise((resolve, reject) => {
        removeContentsOfDirectory(projectFileSystem.projectPath(project), () => {
            resolve();
        })
    });
};