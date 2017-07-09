/**
 * Created by dannyyassine on 2017-07-04.
 */

const chai      = require('chai');
const expect    = chai.expect;
const assert    = chai.assert;

let Project = require('../../../src/core/models/project');
const gitCloneService = require('../../../src/api/infrastructure/git/gitCloneService');

describe('git clone service', () => {

    const response = () => {
        const appendDataToFileLogs = () => {
        };
        return {
            appendDataToFileLogs
        }
    };

    it('should clone a project', function (done) {
        this.timeout(5000);

        let service = gitCloneService({
            response: response()
        });
        let project = new Project();
        service.clone(project).then(() => {
            done();
        }).catch(() => {
            assert.fail('test should not fail');
            done();
        })
    });
});