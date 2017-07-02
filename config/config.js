/**
 * Created by dannyyassine on 2017-06-22.
 */

const path = require('path');

const config = {
    port: 3002,
    workspacePath: path.join(__dirname, '..', '/workspace'),
    dataPath: path.join(__dirname, '..','/src/data/data.json')
};

if (process.env.NODE_ENV === 'test') {
    config.workspacePath = path.join(__dirname, '..', '/test/workspace');
    config.dataPath = path.join(__dirname, '..', '/test/data.json');
}

module.exports = config;