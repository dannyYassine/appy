/**
 * Created by dannyyassine on 2017-06-10.
 */

const express = require('express');
const { middlewareControllerProject, updateProject, projectRoot, addNewProject, allProjects } = require('./../controllers/project');

let router = express.Router();

router.route('/projects/add')
    .post(addNewProject);

router.route('/projects')
    .get(allProjects);

router.route('/project/:project_id')
    .all(middlewareControllerProject)
    .get(projectRoot);

router.route('/project/:project_id/edit')
    .all(middlewareControllerProject)
    .patch(updateProject);

module.exports = router;
