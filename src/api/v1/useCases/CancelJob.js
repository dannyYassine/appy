/**
 * Created by dannyyassine on 2017-06-25.
 */

module.exports = function({jobId = -1, getJob, cancelJob}) {
    return new Promise((resolve, reject) => {
        if (jobId === -1) return reject(Error('jobId require'));

        getJob().then((job) => {
            if (!job.isRunning) { reject(Error("job is not running")) }
            return cancelJob(jobId)
        }).then((() => {
            resolve();
        })).catch((err) => {
            reject(err);
        })
    });
};