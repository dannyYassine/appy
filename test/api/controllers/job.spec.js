/**
 * Created by dannyyassine on 2017-07-01.
 */

const chai      = require('chai');
const expect    = chai.expect;
const assert    = chai.assert;
const jobControllerFactory = require('./../../../src/api/v1/controllers/job');
const mock = require('./../../mock');
const cancelJobInteractor = require('./../../../src/api/v1/useCases/CancelJob');

describe('Job Controller', () => {

    const jobService = (running) => {
        const cancelJob = () => {
            return new Promise((resolve, _) => { resolve() })
        };
        const getJob = (pid) => {
            return new Promise((resolve, _) => {
                assert(pid !== null);
                assert(pid !== -1);
                resolve({isRunning: running})
            })
        };
        return {
            cancelJob,
            getJob
        }
    };

    it('should respond to cancel a job', (done) => {

        let service = jobService(true);

        let interactor = cancelJobInteractor({
            getJob: service.getJob,
            cancel: service.cancelJob
        });

        let jobController = jobControllerFactory({
            interactor: interactor
        });

        let mocker = {};
        mocker.request = mock.Request();
        mocker.response = mock.Response();

        mocker.request.params.pid = 100;


        jobController.cancel(mocker.request, mocker.response);

        mocker.response.on('json', () => {
            assert(mocker.response.getStatus() === 200);
            assert(mocker.response.getJson().data !== null);
            done();
        });

    });

    it('should respond on reject cancel job', (done) => {

        let service = jobService(true);

        let interactor = cancelJobInteractor({
            getJob: service.getJob,
            cancel: service.cancelJob
        });

        let jobController = jobControllerFactory({
            interactor: interactor
        });

        let mocker = {};
        mocker.request = mock.Request();
        mocker.response = mock.Response();

        mocker.request.params.pid = null;

        jobController.cancel(mocker.request, mocker.response);

        mocker.response.on('json', () => {
            assert(mocker.response.getStatus() === 400);
            assert(mocker.response.getJson().error !== null);
            done();
        });

    });

});