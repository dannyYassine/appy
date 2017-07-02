/**
 * Created by dannyyassine on 2017-06-25.
 */
const exec = require('child_process').exec;
const cancelJobInteractor = require('./../useCases/CancelJob');

/**
 *
 * @returns {{cancel: (function(*, *))}}
 */
const jobController = function ({getJob, cancelJob}) {

    /**
     * Cancel a job
     * @param request
     * @param response
     */
    const cancel = (request, response) => {

        cancelJobInteractor({
            jobId: request.params.pid,
            getJob: getJob,
            cancelJob: cancelJob
        }).then(() => {
            response.status(200).json({'data': 'job cancelled'});
        }).catch((err) => {
            response.status(400).json({'error': err});
        });
    };

    return {
        cancel
    }
};

module.exports = jobController;