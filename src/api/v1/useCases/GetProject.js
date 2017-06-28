/**
 * Created by dannyyassine on 2017-06-19.
 */

/**
 *
 * @type {(p1:{projectId?: *, dataSource?: *, callback?: *})}
 */
module.exports = getProject = ({projectId, dataSource, callback}) => {

    if (projectId === undefined || projectId === null) {
        return callback(null, Error("projectId required"));
    }

    if (dataSource === undefined || dataSource === null) {
        return callback(null, Error("dataSource needed"));
    }

    dataSource.loadProjectData(projectId, callback);

};