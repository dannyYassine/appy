/**
 * Created by dannyyassine on 2017-06-20.
 */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const ProjectDataManager = require('../../../src/api/infrastructure/dataSource/ProjectDataManager');
const Project = require('./../../../src/core/models/project');
const fs = require('fs');
const uuid = require('./../../../src/core/helpers/uuid');
const rmDir = require('./../../../src/core/helpers/directory');
const { exec } = require('child_process');
const path = require('path');
const config = require('./../../../config/config');

describe('ProjectDataManager', () => {
    const dataPath = path.join(__dirname, '../../', '/data.json');
    const project = new Project();

    before(() => {
        ProjectDataManager.setup({dataPath: dataPath});
        if (!fs.existsSync(config.workspacePath)) {
            fs.mkdirSync(config.workspacePath);
        }
    });

    after((done) => {
        let workspacePath = path.join(__dirname, '../../', '/workspace');
        exec(`rm -rf ${workspacePath}`, (error, stdout, stderr) => {
            done();
        });
    });

    function setData() {
        return new Promise((resolve, reject) => {
            data = {
                projects: [project]
            };
            fs.writeFile(dataPath, JSON.stringify(data), (err) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    it('should be able to load all projects', (done) => {
        setData().then(() => {
            fs.writeFile(dataPath, JSON.stringify(data), (error) => {
                ProjectDataManager.loadAllProjects((data) => {
                    assert(data.projects.length > 0);
                    done();
                })
            });
        });
    });

    it('should be able to save a project', function(done) {
        this.timeout(5000);
        const project = new Project();
        project.name = "Hello";

        setData().then((data) => {
            ProjectDataManager.saveNewProject(project, (savedProject, err) => {
                assert(err === null);
                assert(savedProject);
                ProjectDataManager.loadAllProjects((newData) => {
                    assert(newData);
                    assert(newData.projects.length >= data.projects.length);
                });
                done();
            });
        }).catch((error) => {
            assert(error === null);
            done();
        });
    });

    it('should be able to load a project with a projectId', (done) => {

        setData().then((data) => {
            ProjectDataManager.loadProjectData(project.id, (loadedProject) => {
                assert(project.id === loadedProject.id);
                done();
            });
        }).catch((error) => {

        });
    });

    it('should delete a project', function(done) {
        this.timeout(5000);
        const newProject = new Project();
        newProject.name = "Hello1";

        setData().then((data) => {
            ProjectDataManager.saveNewProject(newProject, (savedProject, err) => {
                assert(err === null);
                assert(savedProject);
                ProjectDataManager.deleteProject(newProject.id).then((finalData) => {
                    assert(finalData);
                    ProjectDataManager.loadAllProjects((allData) => {
                        assert(finalData.projects.length <= allData.projects.length);
                    });
                    done();
                }).catch((error) => {
                    assert(error === null);
                    done();
                });
            })
        }).catch((error) => {
            assert(error === null);
            done();
        });
    });

    it('should be able to update a project', function(done) {
        this.timeout(5000);
        const project = new Project();
        project.name = "Hello2";

        setData().then((data) => {
            ProjectDataManager.saveNewProject(project, (newData) => {
                let updateProject = Object.assign({}, project);
                updateProject.name = "world";
                ProjectDataManager.updateProject(updateProject)
                    .then((updatedProject) => {
                        assert(updatedProject);
                        assert(updatedProject.name !== project.name);
                        done();
                    }).catch((error) => {
                    assert(error === null);
                    done();
                });
            });
        }).catch((error) => {
            assert(error === null);
            done()
        });
    });

});