/**
 * Created by dannyyassine on 2017-06-11.
 */

var ProjectDataManager = require('./../dataSource/ProjectDataManager');
var Project = require('./../../../core/models/project');

module.exports = function addProject (name, callback) {
    if (name === undefined || name === '') {
        callback({error: 'missing name'});
    } else {
        let project = new Project();
        project.name = name;
        ProjectDataManager.saveNewProject(project, (error) => {
            callback(error);
        });
    }
};