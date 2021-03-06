/**
 * Created by dannyyassine on 2017-06-22.
 */

const fs = require('fs');
const config = require('./../../../../config/config');
const path = require('path');
const { exec } = require('child_process');

const projectFileSystem = (function() {

    /**
     * PRIVATE
     * Helper method to create workspace directory path of the project
     * @param project
     * @returns {*|string}
     */
    const projectPath = function (project) {
        return path.join(config.workspacePath, `/${project.name}`);
    };

    /**
     * PRIVATE
     * Helper method to remove directory and contents async
     * @param path
     * @param callback
     */
    const removeDirectoryAtPath = function (path, callback) {
        exec(`rm -rf ${path}`, (error, stdout, stderr) => {
            callback(error)
        });
    };

    /**
     * PRIVATE
     * Helper method if project does not already exist
     * @param project
     * @returns {Promise}
     */
    const directoryExistsForCreation = (project) => {
        return new Promise(function (resolve, reject) {
            fs.access(projectPath(project), (error, stats) => {
                if (error && error.errno !== -2)
                    reject(Error('project with the same name already exists'));
                else
                    resolve();
            })
        });
    };

    /**
     * PRIVATE
     * Helper method if project does exist to safely delete it
     * @param project
     * @returns {Promise}
     */
    const directoryExistsForDeletion = (project) => {
        return new Promise(function (resolve, reject) {
            fs.access(projectPath(project), (error, stats) => {
                if (error && error.errno === -2) {
                    return reject(Error('project does not exist'));
                }
                resolve();
            })
        });
    };

    /**
     * Creates project workspace
     * @param {Object} project - project model
     * @returns {Promise}
     */
    const createProjectDirectory = (project) => {
        return new Promise(function (resolve, reject) {
            directoryExistsForCreation(project)
                .then(() => {
                    fs.mkdir(projectPath(project), (error) => {
                        if (error) return reject(error);
                        return resolve();
                    })
                })
                .catch((error) => {
                    return reject(error);
                })
        });
    };

    /**
     * Deletes project workspace
     * @param {Object} project - project model
     * @returns {Promise}
     */
    const deleteProjectDirectory = (project) => {
        return new Promise(function (resolve, reject) {
            directoryExistsForDeletion(project)
                .then(() => {
                    removeDirectoryAtPath(projectPath(project), (error) => {
                        if (error) return reject(error);
                        return resolve();
                    })
                })
                .catch((error) => {
                    return reject(error);
                });
        });
    };

    /**
     *
     */
    return {
        projectPath,
        createProjectDirectory,
        deleteProjectDirectory
    }

})();

module.exports = projectFileSystem;