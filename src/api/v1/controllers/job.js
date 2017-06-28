/**
 * Created by dannyyassine on 2017-06-25.
 */
const exec = require('child_process').exec;
const cancelJob = require('./../useCases/CancelJob');

/**
 * Cancel a job
 * @param request
 * @param response
 */
exports.cancel = (request, response) => {

    const dataSource =  {
        cancelJob(jobId) {
            return new Promise((resolve, reject) => {
                exec('ps -9 ' + jobId, (err, stdout, stderr) => {
                    if (err) return reject(err);
                    //TODO: - Update project
                    resolve();
                });
            });
        }
    };

    let project = request.body;

    cancelJob({
        project: project,
        jobId: request.params.pid,
        dataSource:dataSource
    }).then(() => {
        response.json({'data': 'job cancelled'});
    }).catch((err) => {
        response.status(400).json({'error': err});
    });

};