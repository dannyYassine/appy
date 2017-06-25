/**
 * Created by dannyyassine on 2017-06-24.
 */

const fs = require('fs');
const projectFileSystem = require('./../services/projectFileSystem');

/**
 * file path of full log
 * @param project
 * @returns {string}
 */
const logPath = function (project) {
    let projectPath = projectFileSystem.projectPath(project);
    return `${projectPath}/run-log.txt`;
};

/**
 * file path of progressive log
 * @param project
 * @returns {string}
 */
const progressiveLogPath = function (project) {
    let projectPath = projectFileSystem.projectPath(project);
    return `${projectPath}/progressive-log.txt`;
};

/**
 * Method to return text log of entire script
 * @param project
 * @returns {Promise}
 */
const getFullLog = function (project) {
    return new Promise((resolve, reject) => {
        fs.readFile(logPath(project), (error, data) => {
            if (data) return resolve(data.toString());
            else return reject(Error('no log'))
        });
    });
};

/**
 * Method to return pregressove text log
 * @param project
 * @returns {Promise}
 */
const getProgressiveLog = function (project) {
    return new Promise((resolve, reject) => {
        fs.readFile(progressiveLogPath(project), (error, data) => {
            if (data) return resolve(data.toString());
            else return reject(Error('no log'))
        });
    });
};

/**
 * Resets content of progressive log
 * @param project
 * @returns {Promise}
 */
const resetProgressiveLog = function (project) {
    return new Promise((resolve, reject) => {
        fs.writeFile(progressiveLogPath(project), '', (error) => {
            if (error) return reject(error);
            else return resolve();
        });
    });
};

module.exports = {
    logPath,
    progressiveLogPath,
    getFullLog,
    getProgressiveLog,
    resetProgressiveLog
};