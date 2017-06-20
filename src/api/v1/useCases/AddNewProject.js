/**
 * Created by dannyyassine on 2017-06-11.
 */

var Project = require('./../../../core/models/project');

module.exports = function addProject ({name, dataSource, callback}) {
    if (name === undefined || name === '') {
        callback({error: 'missing name'});
    } else {
        let project = new Project();
        project.name = name;
        if (dataSource) {
            dataSource.saveNewProject(project, (error) => {
                callback(project, error);
            });
        } else {
            callback(project, null);
        }
    }
};