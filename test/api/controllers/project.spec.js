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
const app       = require('./../../../src/server');
const project   = require('../../../src/api/v1/controllers/project');
const projectDataManager = require('./../../../src/api/v1/dataSource/ProjectDataManager');
const dataPath  = path.join(__dirname, '../../..', 'data.json');
const Project   = require('./../../../src/core/models/project');
const config = require('./../../../config/config');

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
                name: "new_name",
                script: "hello world"
            })
            .end((err, res) => {

                expect(res).to.have.status(200);
                done();
            });
    });

});
