/**
 * Created by dannyyassine on 2017-04-23.
 */
// set up ========================
let express     = require('express');
let app         = express();                               // create our app w/ express
let bodyParser = require('body-parser');
let fs = require('fs');
let nunjucks = require('nunjucks');
let path = require('path');
const routerManager = require('./api/v1/routes');
const projectDataManager = require('./api/v1/dataSource/ProjectDataManager');

// configuration =================

app.use(express.static(path.join(__dirname, '..', '/public')));
app.use(express.static(path.join(__dirname, '..', '/dist')));
app.use(express.static(path.join(__dirname, '..', '/views')));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

const options = {};
options.dataPath = process.env.NODE_ENV === 'test' ? path.join(__dirname, '..', '/test/data.json') : __dirname+'/data.json';

routerManager.setup(app);
projectDataManager.setup(options);

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('*', (request, response) => {
    response.sendFile('index.html', { root: path.join(__dirname, '..', 'views') });
});

module.exports = app;
