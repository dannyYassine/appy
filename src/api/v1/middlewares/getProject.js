/**
 * Created by dannyyassine on 2017-06-24.
 */

const getProject = require('./../useCases/GetProject');
const ProjectDataManager = require('./../dataSource/ProjectDataManager');
const Project = require('./../../../core/models/project');

/**
 * Middleware to retrieve a Project with its projectId
 * @param request
 * @param response
 * @param next
 */
exports.middlewareControllerProject = (request, response, next) => {
    let projectId = request.params.project_id;

    const callback = (project) => {
        if (project) {
            response.locals.project = Object.assign(new Project, project);
            next();
        } else {
            response.status(400).json({error: Error('no project')});
        }
    };

    getProject({
        projectId: projectId,
        dataSource: ProjectDataManager,
        callback: callback
    });
};