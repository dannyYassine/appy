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
        logger.getFullLog(project).then((log) => {
            logger.resetProgressiveLog(project).then(() => {
                resolve(log);
            });
        }).catch(reject)
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
        logger.getProgressiveLog(project).then((log) => {
            logger.resetProgressiveLog(project).then(() => {
                resolve(log);
            });
        }).catch(reject)
    });
};

module.exports = {
    getLog,
    getProgressiveLog
};