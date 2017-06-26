/**
 * Created by dannyyassine on 2017-06-25.
 */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const workspace = require('./../../../src/api/v1/dataSource/workspace');
const ProjectDataManager = require('./../../../src/api/v1/dataSource/ProjectDataManager');
const Project = require('./../../../src/core/models/project');
const path = require('path');
const fs = require('fs');
const uuid = require('./../../../src/core/helpers/uuid');
const config = require('./../../../config/config');

describe('workspace', () => {
    const project = new Project();
    project.name = "workspaceTest";
    const workspacePath = path.join(config.workspacePath, `/${project.name}`);
    const subWorkspacePath = path.join(config.workspacePath, `/${project.name}/some`);

    before(() => {
        if (!fs.existsSync(config.workspacePath)) {
            fs.mkdirSync(config.workspacePath);
        }
        if (!fs.existsSync(workspacePath)) {
            fs.mkdirSync(workspacePath);
        }
        if (!fs.existsSync(subWorkspacePath)) {
            fs.mkdirSync(subWorkspacePath);
        }
    });

    it('should clear workspace of a project', (done) => {

        workspace.clearWorkspace(project).then(() => {
            let subWorkspacePathDeleted = fs.existsSync(subWorkspacePath);
            assert(subWorkspacePathDeleted === false);
            done();
        }).catch((err) => {
            assert(false);
            done();
        });

    });

});