/**
 * Created by dannyyassine on 2017-06-10.
 */

const express = require('express');
const {
    middlewareControllerProject,
    updateProject,
    addNewProject,
    allProjects,
    deleteProject,
    getProject
} = require('./../controllers/project');

module.exports = function(app) {
    let router = express.Router();

    router.route('/projects/add')
        .post(addNewProject);

    router.route('/projects')
        .get(allProjects);

    router.route('/project/:project_id')
        .all(middlewareControllerProject)
        .get(getProject)
        .delete(deleteProject);

    router.route('/project/:project_id/edit')
        .all(middlewareControllerProject)
        .put(updateProject);

    app.use('/api', router);
};


