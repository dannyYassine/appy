/**
 * Created by dannyyassine on 2017-06-10.
 */

const ProjectDataManager = require('./../dataSource/ProjectDataManager');
const addProject = require('./../useCases/AddNewProject');
const getProject = require('./../useCases/GetProject');
const updateProject = require('./../useCases/UpdateProject');

exports.middlewareControllerProject = (request, response, next) => {
    let projectId = request.params.project_id;

    ProjectDataManager.loadProjectData(projectId, (project) => {
        if (project) {
            response.locals.project = project;
            next();
        } else {
            response.status(400).json({error: "No project"});
        }
    });
};

exports.allProjects = (request, response) => {
    ProjectDataManager.loadAllProjects((data) => {
        response.status(200).json({data: data.projects});
    });
};

exports.addNewProject = (request, response) => {
    addProject({
        name: request.body.project_name,
        dataSource: ProjectDataManager,
        callback: (project, error) => {
            if (error) response.status(400).json({error: error});
            else response.json({data: "added"});
        }
    });
};

exports.getProject = (request, response) => {
    let projectId = request.params.project_id;
    getProject({
        projectId: projectId,
        dataSource: ProjectDataManager,
        callback: (project, error) => {
            if (error) response.status(400).json({error: error});
            else response.status(200).json({data: project});
        }
    })
};

exports.updateProject = (request, response) => {
    let project = response.locals.project;

    let options = {};
    options.name = request.body.name;
    options.script = request.body.script;

    updateProject({
        project: project,
        options: options,
        dataSource: ProjectDataManager
    }).then((updatedProject) => {
        response.json({data: updatedProject});
    }).catch(() => {
        response.json({'error': Error('could not update project')})
    });
};

exports.deleteProject = (request, response) => {
    let project = response.locals.project;

    ProjectDataManager.deleteProject(project.id).then(() => {
        response.status(200).json({data: "delete"});
    });
};

