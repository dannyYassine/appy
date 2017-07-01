/**
 * Created by dannyyassine on 2017-06-10.
 */

const express = require('express');
const settingsFactory = require('./../controllers/settings');

module.exports = function(app) {

    const dataSource = {
        retrieveSettings() {
            return {};
        }
    };

    const settings = settingsFactory(dataSource);

    let router = express.Router();
    router.route('/settings')
        .get(settings.environmentSettings);

    app.use('/api', router);
};
