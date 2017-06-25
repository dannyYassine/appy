/**
 * Created by dannyyassine on 2017-06-25.
 */

module.exports = function({jobId = -1, dataSource}) {
    return new Promise((resolve, reject) => {
        if (jobId === -1) return reject(Error('jobId require'));

       return dataSource.cancelJob(jobId)
    });
};