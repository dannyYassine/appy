/**
 * Created by dannyyassine on 2017-07-03.
 */
const projectFileSystem = require('./projectFileSystem');
const fs = require('fs');

module.exports = jobLogger = function (project) {

    let projectPath = projectFileSystem.projectPath(project);
    let runLog = `${projectPath}/run-log.txt`;
    let progressiveLog = `${projectPath}/progressive-log.txt`;

    /**
     * PRIVATE
     * @param runLog
     * @param progressiveLog
     * @param data
     */
    const appendDataToLogs = (runLog, progressiveLog, data) => {
        fs.appendFile(runLog, data.toString());
        fs.appendFile(progressiveLog, data.toString());
    };

    /**
     * Receive data output from a running job
     * @param data
     */
    const saveDataToLogs = function (data) {
        appendDataToLogs(runLog, progressiveLog, data);
    };

    return {
        appendDataToFileLogs: saveDataToLogs
    }

};