/**
 * Created by dannyyassine on 2017-04-23.
 */
const express       = require('express');
let app             = express();
let bodyParser      = require('body-parser');
let fs              = require('fs');
let nunjucks        = require('nunjucks');
let path            = require('path');
const routerManager = require('./api/inputs/routes');
const projectDataManager = require('./api/infrastructure/dataSource/ProjectDataManager');
const config        = require('./../config/config');
const jobScheduler = require('./api/infrastructure/scheduler/jobSheduler');
const projectDataSource = require('./api/infrastructure/dataSource/ProjectDataManager');
const Project = require('./core/models/project');

/**
 * App Configuration
 */
app.use(express.static(path.join(__dirname, '..', '/public')));
app.use(express.static(path.join(__dirname, '..', '/dist')));
app.use(express.static(path.join(__dirname, '..', '/views')));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

/**
 * Setup application routes / persistance
 */
routerManager.setup(app);
projectDataManager.setup(config);

projectDataSource.loadAllProjects((data) => {
    const trueProjects = data.projects.map((project) => {
        return Object.assign(new Project, project);
    });
    jobScheduler.initJobs(trueProjects);
});

/**
 * Nunjucks for serving html pages
 */
nunjucks.configure(path.join(__dirname, 'web', '/views'), {
    autoescape: true,
    express: app
});

/**
 * Front-end application
 */
app.get('*', (request, response) => {
    response.render('index.html');
});

module.exports = app;
