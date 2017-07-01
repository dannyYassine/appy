/**
 * Created by dannyyassine on 2017-07-01.
 */

const expect = require('chai').expect;
const assert = require('chai').assert;
const cancelJob = require('../../../src/api/v1/useCases/CancelJob');
const Project = require('./../../../src/core/models/project');

describe('Cancel Job Interactor',() => {

    const jobService = (running) => {
        const cancelJob = () => {
            return new Promise((resolve, _) => { resolve() })
        };
        const getJob = (pid) => {
            return new Promise((resolve, _) => { resolve({isRunning: running}) })
        };
        return {
            cancelJob,
            getJob
        }
    };

    it('should cancel a running job', (done) => {
        let project = new Project();
        project.pid = 12;

        let service = jobService(true);

        cancelJob({
            jobId: project.pid,
            getJob: service.getJob,
            cancelJob: service.cancelJob
        }).then(() => {
            done();
        }).catch(() => {
            assert.fail();
            done();
        });
    });
    it('should not be able to cancel a non-running job', (done) => {
        let project = new Project();
        project.pid = 12;
        let service = jobService(false);
        cancelJob({
            jobId: project.pid,
            getJob: service.getJob,
            cancelJob: service.cancelJob
        }).then(() => {
            assert.fail();
            done();
        }).catch((err) => {
            expect(err);
            done();
        });
    });

    it('should fail with wrong jobId', (done) => {
        let project = new Project();
        let service = jobService(false);
        cancelJob({
            jobId: project.pid,
            getJob: service.getJob,
            cancelJob: service.cancelJob
        }).then(() => {
            assert.fail();
            done();
        }).catch((err) => {
            expect(err);
            done();
        });
    });

    it('should fail cancelling a job', (done) => {
        let project = new Project();

        const jobService = (running) => {
            const cancelJob = () => {
                return new Promise((resolve, reject) => { reject(Error("error")) })
            };
            const getJob = (pid) => {
                return new Promise((resolve, _) => { resolve({isRunning: running}) })
            };
            return {
                cancelJob,
                getJob
            }
        };

        let service = jobService(false);
        cancelJob({
            jobId: project.pid,
            getJob: service.getJob,
            cancelJob: service.cancelJob
        }).then(() => {
            assert.fail();
            done();
        }).catch((err) => {
            expect(err);
            done();
        });
    });
});