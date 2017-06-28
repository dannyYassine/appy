/**
 * Created by dannyyassine on 2017-06-18.
 */
process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const assert = require('chai').assert;
const addProject = require('../../../src/api/v1/useCases/AddNewProject');

describe('AddProject', () => {

    const dataSource = {
        saveNewProject(project, cb) {
            assert(project.name != '');
            cb(project, null);
        }
    };

    it('should add a new project', () => {

        addProject({
            request: {
                name: "new",
            },
            data: dataSource,
            response: {
                callback: (project, error) => {
                    assert(error === null);
                }
            }
        })

    });

    it('should not add a project with no name', () => {

        addProject({
            request: {
                name: "",
            },
            data: null,
            response: {
                callback: (project, error) => {
                    assert(error !== null);
                }
            }
        })

    });

    it('should validate business rule to add a project only', () => {

        addProject({
            request: {
                name: "new",
            },
            response: {
                callback: (project, error) => {
                    assert(error === null);
                }
            }
        })

    });
});