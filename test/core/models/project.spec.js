/**
 * Created by dannyyassine on 2017-06-17.
 */

const expect = require('chai').expect;
const assert = require('chai').assert;
const Project = require('../../../src/core/models/project');

describe('Project', () => {
    it('should be not null', () => {
        let project = new Project();
        assert(project.name == '');
        assert(project.id != '');
        assert(project.pid == -1);
        assert(project.repo != null);
        assert(project.isRunning == false);
        assert.typeOf(project.createdOn, 'Date');
        assert.typeOf(project.updatedOn, 'Date');
    });
    it('should be able to stopped', () => {
        let project = new Project();
        project.isRunning = true;
        project.pid = 123;
        assert(project.isRunning == true);
        assert(project.pid != -1);

        project.stopped();
        assert(project.isRunning == false);
        assert(project.pid == -1);
    });
});