/**
 * Created by dannyyassine on 2017-06-25.
 */
const exec = require('child_process').exec;
const cancelJobInteractor = require('./../../application/useCases/CancelJob');

/**
 *
 * @returns {{cancel: (function(*, *))}}
 */
const jobController = function (options) {

    const { interactor: cancelJobInteractor  } = options;

    /**
     * Cancel a job
     * @param request
     * @param response
     */
    const cancel = (request, response) => {

        cancelJobInteractor.cancelJob({
            jobId: request.params.pid
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