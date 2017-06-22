/**
 * Created by dannyyassine on 2017-06-18.
 */


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
            name: "new",
            dataSource: dataSource,
            callback: (project, error) => {
                assert(error === null);
            }
        })

    });

    it('should not add a project with no name', () => {

        addProject({
            name: "",
            dataSource: null,
            callback: (project, error) => {
                assert(error !== null);
            }
        })

    });

    it('should validate business rule to add a project only', () => {

        addProject({
            name: "new",
            callback: (project, error) => {
                assert(project);
                assert(error === null);
            }
        })

    });
});