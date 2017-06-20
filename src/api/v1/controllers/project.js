/**
 * Created by dannyyassine on 2017-06-10.
 */

const ProjectDataManager = require('./../dataSource/ProjectDataManager');
const addProject = require('./../useCases/AddNewProject');
const getProject = require('./../useCases/GetProject');

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
    ProjectDataManager.loadAllProjects((projects) => {
        response.status(200).json({data: projects});
    });
};

exports.addNewProject = (request, response) => {

    addProject({
        name: request.body.project_name,
        dataSource: ProjectDataManager,
        callback: (project, error) => {
            if (error) response.status(400).json({error: error});
            response.json({data: "added"});
        }
    });
};

exports.getProject = (request, response) => {
    let project = response.locals.project;
    getProject({
        projectId: project.id,
        dataSource: ProjectDataManager,
        callback: (project, error) => {
            if (error) response.status(400).json({error: error});
            response.status(200).json({data: project});
        }
    })
};

exports.updateProject = (request, response) => {
    let project = response.locals.project;

    ProjectDataManager.updateProject(project).then((project) => {
        response.status(200).json({data: project});
    }).catch((error) => {
        response.status(400).json(error);
    });
};

exports.deleteProject = (request, response) => {
    let project = response.locals.project;

    ProjectDataManager.deleteProject(project.id).then(() => {
        response.status(200).json({data: "delete"});
    });
};

