/**
 * Created by dannyyassine on 2017-06-25.
 */
const exec = require('child_process').exec;
const cancelJob = require('./../useCases/CancelJob');

exports.cancel = (request, response) => {

    const dataSource = function () {
        const cancelJob = function () {
            return new Promise((resolve, reject) => {
                exec('ps -9 ' + request.params.pid, (err, stdout, stderr) => {
                    if (err) return reject(err);
                    //TODO: - Update project
                    resolve();
                });
            });
        }
    }();

    cancelJob({
        jobId: request.params.jobId,
        dataSource:dataSource
    }).then(() => {
        response.json({'data': 'job cancelled'});
    }).catch((err) => {
        response.status(400).json({'error': err});
    });

};