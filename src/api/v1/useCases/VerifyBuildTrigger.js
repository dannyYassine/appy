/**
 * Created by dannyyassine on 2017-07-03.
 */

const runShellScript = require('./RunShellScript');
const exec = require('child_process').exec;
const workspaceManager = require('../services/workspace');
const scriptManager = require('../services/performScript');

module.exports = verifyBuildTrigger = ({data}) => {

    const verify = (project) => {
        return new Promise((resolve, reject) => {

            if (!project.repo) {
                return reject(Error("no valid repo to check"));
            }

            data.verifyTrigger(project).then((mustTrigger) => {
                if (mustTrigger) {
                    return runShellScript({
                        project: project,
                        dataSource: scriptManager,
                        workspace: workspaceManager
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