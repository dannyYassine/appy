/**
 * Created by dannyyassine on 2017-06-25.
 */

const express = require('express');
const { cancel } = require('./../controllers/job');

module.exports = function(app) {
    let router = express.Router();
    router.route('/job/:pid/cancel')
        .post(cancel);
    app.use('/api', router);
};
