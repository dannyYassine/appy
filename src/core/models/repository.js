/**
 * Created by dannyyassine on 2017-06-11.
 */
const uuid = require('./../helpers/uuid');

module.exports = Repository = function() {
    this.id = uuid();
    this.enabled = false;
    this.source = '';
    this.branch = '';
};

