/**
 * Created by dannyyassine on 2017-06-20.
 */

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const ProjectDataManager = require('./../../../src/api/v1/dataSource/ProjectDataManager');
const Project = require('./../../../src/core/models/project');
const fs = require('fs');
const uuid = require('./../../../src/core/helpers/uuid');
const rmDir = require('./../../../src/core/helpers/directory');

describe('ProjectDataManager', () => {
    const dataPath = './test/cache/data.json';

    before(() => {
        data = {
          projects: []
        };
        ProjectDataManager.setup({dataPath: dataPath});
        fs.writeFile(dataPath, JSON.stringify(data));
    });

    after(() => {
        rmDir.removeContentsOfDirectory('./test/cache');
    });

    function setData() {
        return new Promise((resolve, reject) => {
            const dataPath = './test/cache/'+uuid()+'.json';
            data = {
                projects: [new Project(), new Project()]
            };
            ProjectDataManager.setup({dataPath: dataPath});
            fs.writeFile(dataPath, JSON.stringify(data), (err) => {
                if (err) reject();
                resolve(data);
            });
        });
    }

    it('should not setup twice', () => {
        const dataPath1 = ProjectDataManager.getDataPath();
        ProjectDataManager.setup({dataPath: './'});
        const dataPath2 = ProjectDataManager.getDataPath();
        
        assert(dataPath1 === dataPath2);
    });

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

    it('should be able to load a project with a projectId', (done) => {
        const project = new Project();
        data = {
            projects: [project]
        };
        fs.writeFile(dataPath, JSON.stringify(data), () => {
            ProjectDataManager.loadProjectData(project.id, (loadedProject) => {
                assert(project.id === loadedProject.id);
                done();
            });
        });

    });

    it('should be able to save a project', function(done) {
        this.timeout(5000);
        const project = new Project();
        project.name = "Hello";

        setData().then((data) => {
            ProjectDataManager.saveNewProject(project, (newData) => {
                assert(newData);
                assert(newData.projects.length >= data.projects.length);
                done();
            });
        });
    });

    it('should delete a project', function(done) {
        this.timeout(5000);
        const project = new Project();
        project.name = "Hello";

        setData().then((data) => {
            ProjectDataManager.saveNewProject(project, (newData) => {
                ProjectDataManager.deleteProject(project.id).then((finalData) => {
                    assert(finalData);
                    assert(finalData.projects.length <= newData.projects.length);
                    done();
                });
            });
        });
    });

    it('should be able to update a project', function(done) {
        this.timeout(5000);
        const project = new Project();
        project.name = "Hello";

        setData().then((data) => {
            ProjectDataManager.saveNewProject(project, (newData) => {
                let updateProject = Object.assign({}, project);
                updateProject.name = "world";
                ProjectDataManager.updateProject(updateProject).then((updatedProject) => {
                    assert(updatedProject);
                    assert(updatedProject.name !== project.name);
                    done();
                });
            });
        });
    });

});