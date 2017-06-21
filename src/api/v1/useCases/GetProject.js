/**
 * Created by dannyyassine on 2017-06-19.
 */

module.exports = getProject = ({projectId, dataSource, callback}) => {

    if (projectId === undefined || projectId === null) {
        callback(null, Error("projectId required"));
    }

    if (dataSource === undefined || dataSource === null) {
        callback(null, Error("dataSource needed"));
    }

    dataSource.loadProjectData(projectId, callback);

};