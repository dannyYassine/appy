/**
 * Created by dannyyassine on 2017-06-10.
 */

const express = require('express');
const { allProjects } = require('./../controllers/project');

let router = express.Router();
router.route('/projects')
    .get(allProjects);

module.exports = router;
