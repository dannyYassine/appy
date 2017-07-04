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

    it('should run script', (done) => {
        let project = new Project();
        project.shellTask.script = "echo \"Hello\"";

        runScript({
            project: project,
            dataSource: scriptService(),
            workspace: workspaceService()
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
            project: project,
            dataSource: scriptService(),
            workspace: workspaceService()
        }).then(() => {
            assert.fail();
        }).catch((error) => {
            expect(error);
            done();
        });
    });
});