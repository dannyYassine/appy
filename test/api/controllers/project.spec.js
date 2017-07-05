/**
 * Created by dannyyassine on 2017-06-20.
 */


process.env.NODE_ENV = 'test';

const fs        = require('fs');
const chai      = require('chai');
const expect    = chai.expect;
const assert    = chai.assert;
const should    = chai.should();
const chaiHttp  = require('chai-http');
chai.use(chaiHttp);
const path = require('path');
const app       = require('./../../../src/app');
const project   = require('../../../src/api/inputs/controllers/project');
const projectDataManager = require('../../../src/api/infrastructure/dataSource/ProjectDataManager');
const dataPath  = path.join(__dirname, '../../..', 'data.json');
const Project   = require('./../../../src/core/models/project');
const ShellTask = require('./../../../src/core/models/shellTask');
const Repo   = require('./../../../src/core/models/repository');
const config = require('./../../../config/config');
const { removeDirectory } = require('./../../../src/core/helpers/macDeleteFolder');

describe('Server/Controllers/Project', () => {

    // Set up mock data persistance
    projectDataManager.setup({dataPath: dataPath});

    const project = new Project();
    const gettableProject = new Project();
    gettableProject.name = "yo";

    before(() => {

        data = {
            projects: [project, gettableProject]
        };
        fs.writeFileSync(dataPath, JSON.stringify(data));

        if (!fs.existsSync(config.workspacePath)) {
            fs.mkdirSync(config.workspacePath);
        }
    });

    after((done) => {
        removeDirectory(`${config.workspacePath}/yo`, () => {
            done();
        });
    });

    const createLogFoldersAndFiles = function () {
        if (!fs.existsSync(config.workspacePath)) {
            fs.mkdirSync(config.workspacePath);
        }

        try {
            fs.mkdirSync(`${config.workspacePath}/${gettableProject.name}`);
            fs.writeFileSync(`${config.workspacePath}/${gettableProject.name}/run-log.txt`, '');
            fs.writeFileSync(`${config.workspacePath}/${gettableProject.name}/progressive-log.txt`, '');
            fs.writeFileSync(`${config.workspacePath}/${gettableProject.name}/script.sh`, '');
        } catch (err) {

        }

    };

    it('should respond with all projects', (done) => {
        chai.request(app)
            .get('/api/projects')
            .end((err, res) => {
                should.not.exist(err);
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should respond to add a project', (done) => {
        chai.request(app)
            .post('/api/projects/add')
            .send({project_name: 'test_name'})
            .end((err, res) => {
                should.not.exist(err);
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should respond with getting a project with id', (done) => {
        chai.request(app)
            .get(`/api/project/${gettableProject.id}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should respond to delete a project', (done) => {
        chai.request(app)
            .delete(`/api/project/${project.id}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should respond to update a project', (done) => {
        chai.request(app)
            .put(`/api/project/${gettableProject.id}/edit`)
            .send({
                name: "yo",
                repo: JSON.stringify(gettableProject.repo),
                shell_task: JSON.stringify(gettableProject.shellTask)
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should perform shell task', (done) => {
        chai.request(app)
            .get(`/api/project/${gettableProject.id}/build`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should respond to getting project script log', (done) => {
        createLogFoldersAndFiles();
        chai.request(app)
            .get(`/api/project/${gettableProject.id}/log`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should respond to getting project progressive script log', (done) => {
        createLogFoldersAndFiles();
        chai.request(app)
            .get(`/api/project/${gettableProject.id}/progressive-log`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should fail if sent wrong json to POST for add project', (done) => {
        chai.request(app)
            .post('/api/projects/add')
            .send({name: 'test_name_1'})
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it('should fail if tries to delete a project that does not exist', (done) => {
        chai.request(app)
            .delete(`/api/project/123456`)
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it('should fail when trying to update project', (done) => {
        chai.request(app)
            .put(`/api/project/${gettableProject.id}/edit`)
            .send({mock_name: 'test_name_1'})
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

});

