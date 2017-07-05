/**
 * Created by dannyyassine on 2017-07-03.
 */

const runShellScript = require('./RunShellScript');
const workspaceManager = require('../../infrastructure/fileSystem/workspace');
const scriptManager = require('../../infrastructure/scripts/performScript');
const gitService = require('../../infrastructure/git/gitCloneService');
const projectDataManager = require('./../../infrastructure/dataSource/ProjectDataManager');
const jobLogger = require('../../infrastructure/logger/jobLogger');

module.exports = verifyBuildTrigger = ({data}) => {

    const verify = (project) => {
        return new Promise((resolve, reject) => {

            if (!project.repo) {
                return reject(Error("no valid repo to check"));
            }

            data.verifyTrigger(project).then((mustTrigger) => {
                if (mustTrigger) {
                    return runShellScript({
                        request: {
                            project: project
                        },
                        data: {
                            updateProject: projectDataManager.updateProject,
                            clone: gitService({ response: jobLogger(project) }).clone,
                            clearWorkspace: workspaceManager.clearWorkspace,
                            performScript: scriptManager({ response: jobLogger(project) }).performScript
                        }
                    })
                }
            }).then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    };

    return {
        verify
    }

};