/**
 * Created by dannyyassine on 2017-06-11.
 */

let detailProjectRouter = require('./project');
let homeProjectsRouter = require('./home');

const routerManager = (() => {

    function setup(app) {
        detailProjectRouter(app);
        homeProjectsRouter(app);
    }

    return {
        setup
    }

})();

module.exports = routerManager;