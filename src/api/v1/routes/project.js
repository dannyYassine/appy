/**
 * Created by dannyyassine on 2017-06-10.
 */

import express from 'express'
import { middlewareControllerProject, allProjects, projectRoot, addNewProject } from './../controllers/project'

let router = express.Router()

router.route('/project/:project_id')
    .all(middlewareControllerProject)
    .get(projectRoot)

router.route('/projects/add')
    .post(addNewProject)

module.exports = router
