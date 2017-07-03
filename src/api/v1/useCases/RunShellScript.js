/**
 * Created by dannyyassine on 2017-06-23.
 */

/**
 *
 * @type {runShellScript}
 */
module.exports = runShellScript = function ({project, dataSource, workspace}) {
    return new Promise((resolve, reject) => {
        if (project.shellTask.script.length === 0 && project.isRunning) {
            return reject()
        }

        workspace.clearWorkspace(project)
            .then(() => {
            return dataSource.performScript(project);
        }).then(() => {
            resolve();
        }).catch(reject);
    });
};