/**
 * Created by dannyyassine on 2017-06-23.
 */

/**
 *
 * @type {runShellScript}
 */
module.exports = runShellScript = function ({request, data}) {
    return new Promise((resolve, reject) => {
        let project = request.project;
        if (!project.shellTask.script && project.isRunning) {
            return reject()
        }

        project.started();
        data.updateProject(project).then(() => {
            return data.clearWorkspace(project);
        }).then(() => {
            return data.clone(project);
        }).then(() => {
            return data.performScript(project);
        }).then(() => {
            resolve();
        }).catch((err) => {
            project.stopped();
            data.updateProject(project).then(() => {
                reject(err);
            }).catch((err) => {
                reject(err);
            });
        });
    });
};