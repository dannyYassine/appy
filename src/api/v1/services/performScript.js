/**
 * Created by dannyyassine on 2017-06-23.
 */
const fs = require('fs');
const projectFileSystem = require('./projectFileSystem');
const projectDataManager = require('../dataSource/ProjectDataManager');
const spawn = require('child_process').spawn;

const scriptManager = (function () {

    /**
     *
     * @param runLog
     * @param progressiveLog
     * @param data
     */
    const appendDataToFileLogs = (runLog, progressiveLog, data) => {
        fs.appendFile(runLog, data.toString());
        fs.appendFile(progressiveLog, data.toString());
    };

    /**
     *
     * @param project
     */
    const performScript = function(project) {

        // Set up all local variables
        //FIXME: these variables could be injectable
        let projectPath = projectFileSystem.projectPath(project);
        let scriptText = JSON.parse(project.shellTask.script);
        let scriptFile = `${projectPath}/script.sh`;
        let runLog = `${projectPath}/run-log.txt`;
        let progressiveLog = `${projectPath}/progressive-log.txt`;

        // Promises
        const resetFileLog = new Promise((resolve, reject) => {
            fs.writeFile(runLog, '', function (error) {
                return resolve()
            });
        });

        const resetProgressiveFileLog = new Promise((resolve, reject) => {
            fs.writeFile(progressiveLog, '', function (error) {
                return resolve()
            });
        });

        const writeScriptFile = new Promise((resolve, reject) => {
            fs.writeFile(scriptFile, scriptText, () => {
                return resolve();
            });
        });

        // Execute Promises before running script
        Promise.all([resetFileLog, resetProgressiveFileLog, writeScriptFile]).then(() => {

            const child = spawn('sh', [scriptFile], {
                cwd: projectPath
            });

            project.started(child.pid);
            projectDataManager.updateProject(project);

            child.stdout.on('data', function (data) {
                appendDataToFileLogs(runLog, progressiveLog, data);
            });

            child.stderr.on('data', function (data) {
                appendDataToFileLogs(runLog, progressiveLog, data);
            });

            child.on('exit', function (data) {
                appendDataToFileLogs(runLog, progressiveLog, data);
                project.stopped();
                projectDataManager.updateProject(project)
            });
        });

    };
    return {
        performScript
    }
})();

module.exports = scriptManager;