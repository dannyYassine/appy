/**
 * Created by dannyyassine on 2017-06-10.
 */

const ProjectDataManager = require('./../dataSource/ProjectDataManager');
const scriptManager = require('../services/performScript');
const runShellScript = require('./../useCases/RunShellScript');
const consoleLogger = require('../services/consoleLogger');
const projectLog = require('./../useCases/GetProjectLog');
const workspaceManager = require('../services/workspace');

const Project = require('./../../../core/models/project');

const addProjectInteractor = require('./../useCases/AddNewProject');
const getProjectInteractor = require('./../useCases/GetProject');
const updateProjectInteractor = require('./../useCases/UpdateProject');
const jobScheduler = require('./../services/jobSheduler');
const gitService = require('./../services/gitCloneService');
const jobLogger = require('./../services/jobLogger');

const projectController = function ({projectDataSource}) {

    /**
     * Response to - '/projects'
     * @param request
     * @param response
     */
    const allProjects = (request, response) => {
        projectDataSource.loadAllProjects((data) => {
            response.status(200).json({data: data.projects});
        });
    };

    /**
     * Response to - '/projects/add'
     * @param request
     * @param response
     */
    const addNewProject = (request, response) => {
        addProjectInteractor({
            request: {
                name: request.body.project_name,
            },
            service: {
                addSchedule: jobScheduler.addSchedule
            },
            data: projectDataSource,
            response: {
                callback: (project, error) => {
                    if (error) response.status(400).json({error: error});
                    else response.json({data: project});
                }
            }
        });
    };

    /**
     * Response to - '/project/:project_id'
     * @param request
     * @param response
     */
    const getProject = (request, response) => {
        let projectId = request.params.project_id;
        getProjectInteractor({
            projectId: projectId,
            dataSource: projectDataSource,
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
    const updateProject = (request, response) => {
        let project = response.locals.project;

        let options = {};
        options.name = request.body.name;
        options.repo = JSON.parse(request.body.repo);
        options.shellTask = JSON.parse(request.body.shell_task);

        updateProjectInteractor({
            project: project,
            options: options,
            dataSource: projectDataSource
        }).then((updatedProject) => {
            response.json({data: updatedProject});
        }).catch(() => {
            response.status(400).json({'error': Error('could not update project')})
        });
    };

    /**
     * Responds to - '/project/:project_id'
     * @param request
     * @param response
     */
    const deleteProject = (request, response) => {
        let project = response.locals.project;

        projectDataSource.deleteProject(project.id).then(() => {
            response.status(200).json({data: "delete"});
        });
    };

    /**
     * Responds to - '/project/:project_id/build'
     * @param request
     * @param response
     */
    const performShellTask = (request, response) => {
        let project = response.locals.project;
        runShellScript({
            request: {
                project: project
            },
            data: {
                updateProject: ProjectDataManager.updateProject,
                clone: gitService({ response: jobLogger(project) }).clone,
                clearWorkspace: workspaceManager.clearWorkspace,
                performScript: scriptManager({ response: jobLogger(project) }).performScript
            }
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
    const getAllConsoleLog = (request, response) => {
        let project = response.locals.project;
        projectLog.getLog({
            project: project,
            logger: consoleLogger
        })
            .then((log) => {
                response.send(log, { 'Content-Type': 'text/plain' }, 200);
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
    const getProgressiveConsoleLog = (request, response) => {
        let project = response.locals.project;
        projectLog.getProgressiveLog({
            project: project,
            logger: consoleLogger
        }).then((results) => {
            let project = results[0];
            let log = results[1];

            let projectLog = JSON.stringify(log);
            response.json({
                data: project,
                log: projectLog
            })
        })
            .catch((error) => {
                response.status(400).json({error: error});
            });
    };

    return {
        allProjects,
        getProject,
        addNewProject,
        updateProject,
        deleteProject,
        performShellTask,
        getAllConsoleLog,
        getProgressiveConsoleLog
    }

};

module.exports = projectController;