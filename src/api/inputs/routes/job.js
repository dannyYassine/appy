/**
 * Created by dannyyassine on 2017-06-25.
 */

const express = require('express');
const jobFactory = require('../controllers/job');
const cancelJob = require('../../application/useCases/CancelJob');

const repository =  {
    getJob() {

    },
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

let interactor = cancelJob({
    getJob: repository.getJob,
    cancel: repository.cancelJob
});

let jobController = jobFactory({
    interactor: interactor
});

module.exports = function(app) {

    let router = express.Router();
    router.route('/job/:pid/cancel')
        .post(jobController.cancel);

    app.use('/api', router);
};
