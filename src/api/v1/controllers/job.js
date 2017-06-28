/**
 * Created by dannyyassine on 2017-06-25.
 */
const exec = require('child_process').exec;
const cancelJobInteractor = require('./../useCases/CancelJob');

/**
 *
 * @returns {{cancel: (function(*, *))}}
 */
const jobController = function ({dataSource}) {

    /**
     * Cancel a job
     * @param request
     * @param response
     */
    const cancel = (request, response) => {

        let project = request.body;

        cancelJobInteractor({
            project: project,
            jobId: request.params.pid,
            dataSource:dataSource
        }).then(() => {
            response.json({'data': 'job cancelled'});
        }).catch((err) => {
            response.status(400).json({'error': err});
        });
    };

    return {
        cancel
    }
};

module.exports = jobController;