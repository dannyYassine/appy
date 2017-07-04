/**
 * Created by dannyyassine on 2017-06-24.
 */

const projectDataManager = require('./../../infrastructure/dataSource/ProjectDataManager');

/**
 *
 * @param project
 * @param logger
 * @returns {Promise}
 */
const getLog = function ({project, logger}) {
    return new Promise((resolve, reject) => {
        let projectLog;
        logger.getFullLog(project)
            .then((log) => {
                projectLog = log;
                return logger.resetProgressiveLog(project)
            }).then(() => {
            resolve(projectLog);
        }).catch(reject);
    });
};

/**
 *
 * @param project
 * @param logger
 * @returns {Promise}
 */
const getProgressiveLog = function ({project, logger}) {
    let promise = new Promise((resolve, reject) => {
        let projectLog;
        logger.getProgressiveLog(project)
            .then((log) => {
                projectLog = log;
                return logger.resetProgressiveLog(project)
            }).then(() => {
            resolve(projectLog);
        }).catch(reject);
    });

    return new Promise((resolve, reject) => {
        Promise.all([projectDataManager.loadProject(project.id), promise])
            .then((results) => {
                resolve(results);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports = {
    getLog,
    getProgressiveLog
};