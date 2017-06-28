/**
 * Created by dannyyassine on 2017-06-11.
 */
const uuid = require('./../helpers/uuid');

const BaseModel = function() {
    this.id = uuid();
};

BaseModel.prototype.toJSONString = function() {
    return JSON.stringify(this);
};

module.exports = BaseModel;