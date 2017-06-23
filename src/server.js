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

app.use(express.static(path.join(__dirname, '..', '/public')));                // set the static files location /public/img will be /img for users
app.use(express.static(path.join(__dirname, '..', '/dist')));                // set the static files location /public/img will be /img for users
app.use(express.static(path.join(__dirname, '..', '/views')));                // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json

routerManager.setup(app);
const options = {};
options.dataPath = process.env.NODE_ENV === 'test' ? path.join(__dirname, '..', '/test/data.json') : __dirname+'/data.json';

projectDataManager.setup(options);

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

function resetLogFile() {
    fs.writeFile('./src/log.txt', '', function(){
        console.log('done');
        return 1;
    }); // reset content
}

function resetProgressiveLogFile() {
    fs.writeFile('./src/progressive-log.txt', '', function(){
        return 1;
    }); // reset content
}

app.get('/api/data', function(req, res) {
    fs.readFile('./src/data.json', (error, data) => {
        let dataObject = data !== null ? JSON.parse(data) : data
        console.log(dataObject)
        res.status(200).json({data: dataObject})
    });
});

app.get('/run', function(req, res) {

    resetLogFile();

    const spawn = require('child_process').spawn;
    const child = spawn('sh', ['./xcode_build_fabric.sh'], {
        cwd: '../'
    });

    child.stdout.on('data', function (data) {
        // console.log(data.toString());
        fs.appendFile('./src/log.txt', data.toString(), (err) => {
        });
        fs.appendFile('./src/progressive-log.txt', data.toString(), (err) => {
        });
    });

    child.stderr.on('data', function (data) {
        // console.log(data.toString());
    });

    child.on('exit', function (code) {
        console.log('child process exited with code ' + code.toString());
    });
    console.log(child.pid);
    console.log(child);
    res.sendFile('index.html', { root: __dirname });

});

app.get('/run/log', (request, response) => {
    fs.readFile('./src/log.txt', (error, data) => {
        if (data)
            resetProgressiveLogFile();
        response.send(data.toString(), { 'Content-Type': 'text/plain' }, 200);
    });
});

app.get('/run-log', (request, response) => {
    fs.readFile('./src/run-log.txt', (error, data) => {
        if (data)
            fs.writeFile('./src/run-progressive-log.txt', '', function(){
                return 1;
            });
        response.json({log: data.toString()}, 200);
    });
});


app.get('/progressive-log', (request, response) => {
    fs.readFile('./src/progressive-log.txt', (error, data) => {
        if (data)
            fs.writeFile('./src/progressive-log.txt', '', function(){
                return 1;
            });
        response.send(data.toString(), { 'Content-Type': 'text/plain' }, 200);
    });
});

app.get('/run-progressive-log', (request, response) => {
    fs.readFile('./src/run-progressive-log.txt', (error, data1) => {
        if (data1)
            fs.writeFile('./src/run-progressive-log.txt', '', function(){
                return 1;
            });
        fs.readFile("./src/data.json", (error, data) => {
            let dataObject = JSON.parse(data);
            response.json({log: data1.toString(), isRunning: dataObject.projects[0].isRunning})
        });
    });
});

app.get('/log', (request, response) => {

    response.render('log.html');
});

app.get('/input', (request, response) => {
    fs.readFile('./src/script.sh', (error, data) => {
        response.render('input-script.html', {data: data.toString()});
    });
});

app.post('/submit-script', (request, response) => {
    fs.writeFile('./src/script.sh', '', (err) => {
        fs.appendFile('./src/script.sh', request.body.text, (err) => {
            response.json({'redirect': "http://localhost:3002/run-script"})
        });
    });
});

app.get('/run-script', (request, response) => {

    fs.readFile("./src/data.json", (error, dataState) => {
        let dataObject = JSON.parse(dataState);

        if (dataObject.projects[0].isRunning === true) {
            response.render('run-log.html', {job: dataObject.projects[0]});
            return;
        }

        fs.writeFile('./src/run-log.txt', '', function(){
            return 1;
        });
        fs.writeFile('./src/run-progressive-log.txt', '', function(){
            return 1;
        });

        fs.readFile('./src/script.sh', (error, data) => {
            const spawn = require('child_process').spawn;
            const ls = spawn('sh', ['./src/script.sh'], {
            });
            ls.stdout.on('data', function (data) {
                fs.appendFile('./src/run-log.txt', data.toString(), (err) => {
                });
                fs.appendFile('./src/run-progressive-log.txt', data.toString(), (err) => {
                });
            });

            ls.stderr.on('data', function (data) {
                fs.appendFile('./src/run-log.txt', data.toString(), (err) => {
                });
                fs.appendFile('./src/run-progressive-log.txt', data.toString(), (err) => {
                });
            });

            ls.on('exit', function (code) {
                fs.appendFile('./src/run-log.txt', data.toString(), (err) => {
                });
                fs.appendFile('./src/run-progressive-log.txt', data.toString(), (err) => {
                });
                fs.readFile("./src/data.json", (error, data) => {
                    let dataObject = JSON.parse(data);
                    dataObject.projects[0].isRunning = false;
                    fs.writeFile('./data.json', JSON.stringify(dataObject));
                });
            });

            dataObject.projects[0].pid = ls.pid;
            dataObject.projects[0].isRunning = true;
            fs.writeFile('./src/data.json', JSON.stringify(dataObject));

            response.render('run-log.html', {job: dataObject.projects[0]});
        });
    });
});

app.post('/:pid/cancel', (request, response) => {
    const exec = require('child_process').exec;
    exec('ps -9 ' + request.params.pid, (error, stdout, stderr) => {
        console.log(error, stdout, stderr);
        fs.readFile("./src/data.json", (error, data) => {
            let dataObject = JSON.parse(data);
            dataObject.projects[0].isRunning = false;
            fs.writeFile('./src/data.json', JSON.stringify(dataObject));
            response.status(200).end();
        });
    });
});

app.get('*', (request, response) => {
    response.sendFile('index.html', { root: path.join(__dirname, '..', 'views') });
});

app.set('port', process.env.PORT || 3002);
function startServer() {
    // listen (start app with node server.js) ======================================
    var server = app.listen(app.get('port'), '0.0.0.0', function () {
        console.log("*\n*");
        console.log("/****************************************/");
        console.log('server listening on port ' + server.address().port);
        console.log("/****************************************/");
        console.log("*\n*");
    });
    return app;
}

if (require.main === module) {
    // app.js runs directly
    startServer();
} else {
    module.exports = app;
}