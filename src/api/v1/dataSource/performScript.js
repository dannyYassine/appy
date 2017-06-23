/**
 * Created by dannyyassine on 2017-06-23.
 */
const fs = require('fs');
const projectFileSystem = require('./../services/projectFileSystem');
const projectDataManager = require('./../dataSource/ProjectDataManager');
const spawn = require('child_process').spawn;

const scriptManager = (function () {

    const performScript = function(project) {

        let projectPath = projectFileSystem.projectPath(project);
        let scriptText = JSON.parse(project.shellTask.script);
        let scriptFile = `${projectPath}/script.sh`;
        let runLog = `${projectPath}/run-log.txt`;
        let progressiveLog = `${projectPath}/progressive-log.txt`;

        fs.writeFile(runLog, '', function () {
            return 1;
        });
        fs.writeFile(progressiveLog, '', function () {
            return 1;
        });

        fs.writeFile(scriptFile, scriptText, () => {

            const child = spawn('sh', [scriptFile], {
                cwd: projectPath
            });

            project.started(child.pid);
            projectDataManager.updateProject(project);

            child.stdout.on('data', function (data) {
                fs.appendFile(runLog, data.toString(), (err) => {
                });
                fs.appendFile(progressiveLog, data.toString(), (err) => {
                });
            });

            child.stderr.on('data', function (data) {
                fs.appendFile(runLog, data.toString(), (err) => {
                });
                fs.appendFile(progressiveLog, data.toString(), (err) => {
                });
            });

            child.on('exit', function (data) {
                fs.appendFile(runLog, data.toString(), (err) => {
                });
                fs.appendFile(progressiveLog, data.toString(), (err) => {
                });
                project.stopped();
                projectDataManager.updateProject(project)
                    .then(() => {

                    })
                    .catch(() => {

                    });
            });
        });
    };
    return {
        performScript
    }
})();

module.exports = scriptManager;