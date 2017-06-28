/**
 * Created by dannyyassine on 2017-06-22.
 */

const path = require('path');

const config = {
    workspacePath: path.join(__dirname, '..', '/workspace')
};

if (process.env.NODE_ENV === 'test') {
    config.workspacePath = path.join(__dirname, '..', '/test/workspace')
}

module.exports = config;