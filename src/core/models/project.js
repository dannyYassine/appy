/**
 * Created by dannyyassine on 2017-06-11.
 */

const Repository = require('./repository');
const BaseModel = require('./BaseModel');

const Project = function() {
    BaseModel.call(this);

    this.name = '';
    this.pid = -1;
    this.repo = new Repository();
    this.isRunning = false;
    this.createdOn = new Date();
    this.updatedOn = new Date();
};

Project.prototype = Object.create(BaseModel.prototype);

Project.prototype.stopped = function() {
    this.isRunning = false;
    this.pid = -1;
};

module.exports = Project;