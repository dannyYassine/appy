/**
 * Created by dannyyassine on 2017-06-25.
 */


const expect = require('chai').expect;
const assert = require('chai').assert;
const getProject = require('../../../src/api/v1/useCases/GetProject');
const Project = require('./../../../src/core/models/project');

describe('Get project interactor', () => {

    let mockProject = new Project();
    mockProject.name = "mock project";

    const mockDataSource = {
        loadProjectData(projectId, callback) {
            callback(mockProject, null);
        }
    };

    it('should get a project', (done) => {
        getProject({
            projectId: mockProject.id,
            dataSource: mockDataSource,
            callback: (project, error) => {
                assert(error === null);
                assert(project !== null);
                assert(project.id === mockProject.id);
                done();
            }
        });

    });

    it('should fail since projectId was no passed', (done) => {
        getProject({
            projectId: null,
            dataSource: mockDataSource,
            callback: (project, error) => {
                assert(error !== null);
                assert(project === null);
                done();
            }
        });

    });

    it('should fail since projectId was no passed', (done) => {
        getProject({
            projectId: mockProject.id,
            dataSource: null,
            callback: (project, error) => {
                assert(error !== null);
                assert(project === null);
                done();
            }
        });
    });
});