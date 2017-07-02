/**
 * Created by dannyyassine on 2017-06-25.
 */

// module.exports = function({jobId = -1, getJob, cancelJob}) {
//     return new Promise((resolve, reject) => {
//         if (jobId === -1 || jobId == null) return reject(Error('jobId require'));
//
//         getJob(jobId).then((job) => {
//             if (!job.isRunning) { reject(Error("job is not running")) }
//             return cancelJob(jobId)
//         }).then((() => {
//             resolve();
//         })).catch((err) => {
//             reject(err);
//         })
//     });
// };

const interactor = ({ getJob, cancel }) => {

    const cancelJob = (jobId) => {
        return new Promise((resolve, reject) => {
            if (jobId === -1 || jobId == null) return reject(Error('jobId require'));

            getJob(jobId).then((job) => {
                if (!job.isRunning) { reject(Error("job is not running")) }
                return cancel(jobId)
            }).then((() => {
                resolve();
            })).catch((err) => {
                reject(err);
            })
        });
    };

    return {
        cancelJob
    }
};

module.exports = interactor;