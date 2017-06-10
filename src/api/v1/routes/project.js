/**
 * Created by dannyyassine on 2017-06-10.
 */

import express from 'express'
import { projectRoot } from './../controllers/project'

let router = express.Router()

router.route('/project/:project_id')
    .get(projectRoot)

module.exports = router
