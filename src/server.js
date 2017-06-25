
const cluster = require('cluster');

function startNewWorker() {
    var newWorker = cluster.fork();
    console.log('CLUSTER: Worker %d started', newWorker.id);
}

function startServer() {
    // listen (start app with node server.js) ======================================
    const app = require('./app.js');
    app.set('port', process.env.PORT || 3002);
    var server = app.listen(app.get('port'), '0.0.0.0', function () {
        console.log("*\n*");
        console.log("/****************************************/");
        console.log('server listening on port ' + server.address().port);
        console.log("/****************************************/");
        console.log("*\n*");
    });
    return app;
}

if (process.env.CLUSTER === 'TRUE') {
    console.log(process.env.CLUSTER);
    if (cluster.isMaster) {

        const workerCount = process.env.NODE_CLUSTER_WORKERS || 4;

        cluster.on('disconnect', function(worker, code, signal) {
            console.log('CLUSTER: Worker %d disconnected from cluster', worker.id);
        });

        cluster.on('exit', function(worker, code, signal) {
            console.log('CLUSTER: Worker %d died with exit code %d (%s)', worker.id, code, signal);
            startNewWorker();
        });

        for (var i = 0; i < workerCount; i++) {
            startNewWorker();
        }

    } else {
        startServer();
    }
} else {
    startServer();
}
