/**
 * Created by dannyyassine on 2017-06-23.
 */
const fs = require('fs');
const projectFileSystem = require('../fileSystem/projectFileSystem');
const projectDataManager = require('../dataSource/ProjectDataManager');
const spawn = require('child_process').spawn;
const path = require('path');

const scriptManager = function ({response}) {

    /**
     *
     * @param project
     */
    const performScript = function(project) {

        // Set up all local variables
        //FIXME: these variables could be injectable
        let projectPath = projectFileSystem.projectPath(project);
        let cwd = path.join(projectFileSystem.projectPath(project), '/job');
        let scriptText = project.shellTask.script;
        let scriptFile = `${projectPath}/script.sh`;

        // Promises
        const writeScriptFile = new Promise((resolve, reject) => {
            fs.writeFile(scriptFile, scriptText, () => {
                return resolve();
            });
        });

        // Execute Promises before running script
        Promise.all([writeScriptFile]).then(() => {

            const child = spawn('sh', [scriptFile], {
                cwd: cwd
            });

            project.started(child.pid);
            projectDataManager.updateProject(project);

            child.stdout.on('data', function (data) {
                response.appendDataToFileLogs(data);
            });

            child.stderr.on('data', function (data) {
                response.appendDataToFileLogs(data);
            });

            child.on('exit', function (code, signal) {
                console.log(code, signal);
                project.lastSuccessful = code == 0;
                project.stopped();
                projectDataManager.updateProject(project)
            });
        });

    };
    return {
        performScript
    }
};

module.exports = scriptManager;