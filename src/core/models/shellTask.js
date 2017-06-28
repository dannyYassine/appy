/**
 * Created by dannyyassine on 2017-06-23.
 */

const BaseModel = require('./BaseModel');

const ShellTask = function() {
    BaseModel.call(this);

    this.updatedOn = new Date();
    this.createdOn = new Date();
    this.script = '';
};

ShellTask.prototype = Object.create(BaseModel.prototype);

module.exports = ShellTask;