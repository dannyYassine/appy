/**
 * Created by dannyyassine on 2017-06-11.
 */

var Project = require('./../../../core/models/project');
const projectNameValidator = require('./../../../core/validators/projectValidator');
const validateAll = require('./../../../core/validators/validator');

/**
 * Business rules for adding a project
 * @param name
 * @param dataSource
 * @param callback
 */
module.exports = function addProject ({name, dataSource, callback}) {

    let newProject = new Project();
    newProject.name = name;

    let validated = validateAll(newProject, [projectNameValidator()]);

    if (validated === false) {
        callback(null, Error('wrong updated arguments'));
        return;
    }

    if (dataSource) {
        dataSource.saveNewProject(newProject, (project, error) => {
            callback(project, error);
        });
    } else {
        callback(newProject, null);
    }
};