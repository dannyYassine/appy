/**
 * Created by dannyyassine on 2017-06-11.
 */

var BaseModel = function() {}

BaseModel.prototype.toJSONString = function() {
    return JSON.stringify(this);
}

module.exports = BaseModel;