/**
 * Created by dannyyassine on 2017-06-10.
 */

const ProjectDataManager = require('./../dataSource/ProjectDataManager');
const scriptManager = require('./../dataSource/performScript');
const addProject = require('./../useCases/AddNewProject');
const getProject = require('./../useCases/GetProject');
const updateProject = require('./../useCases/UpdateProject');
const runShellScript = require('./../useCases/RunShellScript');
const Project = require('./../../../core/models/project');
const consoleLogger = require('./../dataSource/consoleLogger');
const projectLog = require('./../useCases/GetProjectLog');

/**
 * Response to - '/projects'
 * @param request
 * @param response
 */
exports.allProjects = (request, response) => {
    ProjectDataManager.loadAllProjects((data) => {
        response.status(200).json({data: data.projects});
    });
};

/**
 * Response to - '/projects/add'
 * @param request
 * @param response
 */
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

/**
 * Response to - '/project/:project_id'
 * @param request
 * @param response
 */
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

/**
 * Response to - '/project/:project_id/edit'
 * @param request
 * @param response
 */
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

/**
 * Responds to - '/project/:project_id'
 * @param request
 * @param response
 */
exports.deleteProject = (request, response) => {
    let project = response.locals.project;

    ProjectDataManager.deleteProject(project.id).then(() => {
        response.status(200).json({data: "delete"});
    });
};

/**
 * Responds to - '/project/:project_id/build'
 * @param request
 * @param response
 */
exports.performShellTask = (request, response) => {
    let project = response.locals.project;
    runShellScript({
        project: project,
        dataSource: scriptManager
    }).then(() => {
        response.status(200).json({data: "building"});
    })
        .catch((error) => {
            response.status(400).json({error: error});
        });
};

/**
 * Responds to - '/project/:project_id/log'
 * @param request
 * @param response
 */
exports.getAllConsoleLog = (request, response) => {
    let project = response.locals.project;
    projectLog.getLog({
        project: project,
        logger: consoleLogger
    })
        .then((log) => {
        response.status(200).type('text').send(log);
    })
        .catch((error) => {
            response.status(400).json({error: error});
        });
};

/**
 * Responds to - '/project/:project_id/progressive-log'
 * @param request
 * @param response
 */
exports.getProgressiveConsoleLog = (request, response) => {
    let project = response.locals.project;
    projectLog.getProgressiveLog({
        project: project,
        logger: consoleLogger
    }).then((log) => {
        response.status(200).type('text').send(log);
    })
        .catch((error) => {
            response.status(400).json({error: error});
        });
};
