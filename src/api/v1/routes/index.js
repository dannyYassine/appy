/**
 * Created by dannyyassine on 2017-06-11.
 */

let detailProjectRouter = require('./project');
let settingsRouter = require('./settings');
let jobsRouter = require('./job');

const routerManager = (() => {

    function setup(app) {
        detailProjectRouter(app);
        settingsRouter(app);
        jobsRouter(app);
    }

    return {
        setup
    }

})();

module.exports = routerManager;