/**
 * Created by dannyyassine on 2017-06-11.
 */

const Repository = require('./repository');
const BaseModel = require('./BaseModel');
const ShellTask = require('./shellTask');

const Project = function() {
    BaseModel.call(this);

    this.name = '';
    this.lastSuccessful = false;
    this.pid = -1;
    this.repo = new Repository();
    this.isRunning = false;
    this.createdOn = new Date();
    this.updatedOn = new Date();
    this.shellTask = new ShellTask();
};

Project.prototype = Object.create(BaseModel.prototype);

Project.prototype.started = function(pid) {
    this.isRunning = true;
    if (pid) {
        this.pid = pid;
    }
};

Project.prototype.stopped = function() {
    this.isRunning = false;
    this.pid = -1;
};

module.exports = Project;