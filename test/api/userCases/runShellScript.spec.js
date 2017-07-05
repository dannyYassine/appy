/**
 * Created by dannyyassine on 2017-07-01.
 */

const expect = require('chai').expect;
const assert = require('chai').assert;
const runScript = require('../../../src/api/application/useCases/RunShellScript');
const Project = require('./../../../src/core/models/project');

describe('Run Shell Script Interactor',() => {

    const workspaceService = () => {

        const clearWorkspace = () => {
            return new Promise((resolve, _) => { resolve() })
        };
        return {
            clearWorkspace
        }
    };

    const scriptService = () => {
        const performScript = () => {
            return new Promise((resolve, _) => { resolve() })
        };
        return {
            performScript
        }
    };

    const projectDataManager = () => {
        const updateProject = () => {
            return new Promise((resolve, _) => { resolve() })
        };
        return {
            updateProject
        }
    };

    const gitService = () => {
        const clone = () => {
            return new Promise((resolve, _) => { resolve() })
        };
        return {
            clone
        }
    };

    it('should run script', (done) => {
        let project = new Project();
        project.shellTask.script = "echo \"Hello\"";

        runScript({
            request: {
                project: project,
            },
            data: {
                updateProject: projectDataManager().updateProject,
                clone: gitService().clone,
                clearWorkspace: workspaceService().clearWorkspace,
                performScript: scriptService().performScript
            }
        }).then(() => {
            done();
        }).catch((error) => {
            assert.fail();
            done();
        });
    });
    it('should fail to run script', (done) => {
        let project = new Project();

        runScript({
            request: {
                project: project,
            },
            data: {
                updateProject: projectDataManager().updateProject,
                clone: gitService().clone,
                clearWorkspace: workspaceService().clearWorkspace,
                performScript: scriptService().performScript
            }
        }).then(() => {
            assert.fail();
        }).catch((error) => {
            expect(error);
            done();
        });
    });
});