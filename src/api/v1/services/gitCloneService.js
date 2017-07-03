/**
 * Created by dannyyassine on 2017-07-03.
 */

const { spawn } = require('child_process');
const path = require('path');
const projectFileSystem = require('./projectFileSystem');

const gitService = ({response}) => {

    let scriptPath = path.join(__dirname, '../..', '/core/git_clone.sh');

    const clone = (project) => {

        return new Promise((resolve, reject) => {

            const child = spawn('sh', [`${scriptPath}`, project.repo.branch, project.repo.source], {
                cwd: projectFileSystem.projectPath(project),
                shell: true
            });

            child.stdout.on('data', function (data) {
                response.appendDataToFileLogs(data);
            });

            child.stderr.on('data', function (data) {
                response.appendDataToFileLogs(data);
            });

            child.on('exit', function (code, signal) {
                code == 0 ? resolve(true) : reject();
            });
        })
    };

    return {
        clone
    }
};

module.exports = gitService;