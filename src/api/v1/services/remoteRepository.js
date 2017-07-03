/**
 * Created by dannyyassine on 2017-07-03.
 */

const { exec } = require('child_process');
const path = require('path');
const projectFileSystem = require('./projectFileSystem');

const remoteRepository = () => {

    let scriptPath = path.join(__dirname, '../..', '/core/git_trigger_check.sh');

    /**
     * Returns BOOLEAN if project can be triggered for a build
     * @returns {Promise}
     */
    const verifyTrigger = (project) => {
        return new Promise((resolve, reject) => {
            const options = {
                encoding: 'utf8',
                timeout: 0,
                maxBuffer: 200 * 1024,
                killSignal: 'SIGTERM',
                cwd: projectFileSystem.projectPath(project),
                env: null
            };
            exec(`${scriptPath} ${project.repo.branch}`, options, (err, stdout, stderr) => {
                if (err) { return reject(err) }
                if (stdout) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
        })
    };

    return {
        verifyTrigger
    }

};

module.exports = remoteRepository;