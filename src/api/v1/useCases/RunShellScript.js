/**
 * Created by dannyyassine on 2017-06-23.
 */

/**
 *
 * @type {runShellScript}
 */
module.exports = runShellScript = function ({project, dataSource}) {
    return new Promise((resolve, reject) => {
        if (project.shellTask.script.length === 0 || project.isRunning) {
            reject()
        }

        dataSource.performScript(project);
        resolve();
    });
};