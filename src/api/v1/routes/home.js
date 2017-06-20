/**
 * Created by dannyyassine on 2017-06-10.
 */

const express = require('express');
const { allProjects } = require('./../controllers/project');

module.exports = function(app) {
    let router = express.Router();
    router.route('/projects')
        .get(allProjects);
    app.use('/api', router);
};
