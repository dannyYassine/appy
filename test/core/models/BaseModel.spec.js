/**
 * Created by dannyyassine on 2017-06-17.
 */

const expect = require('chai').expect;
const assert = require('chai').assert;
const BaseModel = require('../../../src/core/models/BaseModel');

describe('BaseModel', () => {
    it('should parse json', () => {
        let baseModel = new BaseModel();
        let json = baseModel.toJSONString();
        assert.typeOf(json, "string");
    });
    it('should parse back to Model', () => {
        let baseModel = new BaseModel();
        let json = baseModel.toJSONString();
        let modelObject = Object.assign(new BaseModel(), JSON.parse(json));
        assert(modelObject != null || modelObject != undefined);
        assert.equal(modelObject.toJSONString(), baseModel.toJSONString());
    });
});