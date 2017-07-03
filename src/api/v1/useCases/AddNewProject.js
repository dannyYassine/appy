/**
 * Created by dannyyassine on 2017-06-11.
 */

var Project = require('./../../../core/models/project');
const nameValidator = require('./../../../core/validators/projectValidator').nameValidator;
const validateAll = require('./../../../core/validators/validator');

/**
 * Business rules for adding a project
 * @param request
 * @param data
 * @param response
 */
module.exports = function addProject ({request, data, service, response}) {

    let newProject = new Project();
    newProject.name = request.name;

    let validated = validateAll(newProject, [nameValidator()]);

    if (validated === false) {
        response.callback(null, Error('wrong updated arguments'));
        return;
    }

    if (data) {
        data.saveNewProject(newProject, (project, error) => {
                service.addSchedule(project);
            response.callback(project, error);
        });
    } else {
        response.callback(newProject, null);
    }
};