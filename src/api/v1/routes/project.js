/**
 * Created by dannyyassine on 2017-06-10.
 */

const express = require('express');
const { middlewareControllerProject } = require('./../middlewares/getProject');
const projectFactory = require('./../controllers/project');
const ProjectDataManager = require('./../dataSource/ProjectDataManager');

module.exports = function(app) {

    let projectController = projectFactory({
        projectDataSource: ProjectDataManager
    });

    let router = express.Router();

    router.route('/projects')
        .get(projectController.allProjects);

    router.route('/projects/add')
        .post(projectController.addNewProject);

    router.route('/project/:project_id')
        .all(middlewareControllerProject)
        .get(projectController.getProject)
        .delete(projectController.deleteProject);

    router.route('/project/:project_id/edit')
        .all(middlewareControllerProject)
        .put(projectController.updateProject);

    router.route('/project/:project_id/build')
        .all(middlewareControllerProject)
        .post(projectController.performShellTask);

    router.route('/project/:project_id/log')
        .all(middlewareControllerProject)
        .get(projectController.getAllConsoleLog);

    router.route('/project/:project_id/progressive-log')
        .all(middlewareControllerProject)
        .get(projectController.getProgressiveConsoleLog);

    app.use('/api', router);
};


