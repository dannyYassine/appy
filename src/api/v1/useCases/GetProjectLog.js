/**
 * Created by dannyyassine on 2017-06-24.
 */

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
    return new Promise((resolve, reject) => {
        let projectLog;
        logger.getProgressiveLog(project)
            .then((log) => {
                projectLog = log;
                return logger.resetProgressiveLog(project)
            }).then(() => {
            resolve(projectLog);
        }).catch(reject);
    });
};

module.exports = {
    getLog,
    getProgressiveLog
};