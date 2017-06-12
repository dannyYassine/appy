/**
 * Created by dannyyassine on 2017-06-11.
 */

var uuid = require('./../helpers/uuid');
var Repository = require('./repository');
var BaseModel = require('./BaseModel');

var Project = function() {
    this.id = uuid();
    this.name = '';
    this.pid = -1;
    this.repo = new Repository();
    this.isRunning = false;
    this.createdOn = new Date();
    this.updatedOn = new Date();
};

Project.prototype = BaseModel.prototype;

Project.prototype.stopped = function() {
    this.isRunning = false;
    this.pid = -1;
};

module.exports = Project;