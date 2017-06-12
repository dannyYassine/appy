/**
 * Created by dannyyassine on 2017-06-10.
 */

const ProjectDataManager = require('./../dataSource/ProjectDataManager');
const addProject = require('./../useCases/AddNewProject');

export const middlewareControllerProject = (request, response, next) => {
    let projectId = request.params.project_id

    ProjectDataManager.loadProjectData(projectId, (project) => {
        if (project) {
            next()
        } else {
            response.status(400).json({error: "No project"})
        }git 
    })
}

export const allProjects = (request, response) => {
    ProjectDataManager.loadAllProjects((projects) => {
        response.status(200).json({data: projects})
    })
}

export const projectRoot = (request, response) => {
    let projectId = request.params.project_id
    ProjectDataManager.loadProjectData(projectId, (project) => {
        response.status(200).json({data: project})
    })
}

export const addNewProject = (request, response) => {

    addProject(request.body.project_name, (error) => {
        if (error) response.status(400).json({error: error});
        response.json({data: "added"});
    });

}

export const updateProject = (request, response) => {
    let projectId = request.params.project_id
    let dataManager = new ProjectDataManager()
    dataManager.loadProjectData(projectId, (project) => {
        response.status(200).json({data: project})
    })
}

export const deleteProject = (request, response) => {

}

