/**
 * Created by dannyyassine on 2017-06-10.
 */

import express from 'express'
import { allProjects } from './../controllers/project'

let router = express.Router()
router.route('/projects')
    .get(allProjects)

module.exports = router
