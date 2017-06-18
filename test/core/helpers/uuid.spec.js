/**
 * Created by dannyyassine on 2017-06-17.
 */

const expect = require('chai').expect;
const assert = require('chai').assert;
const uuid = require('../../../src/core/helpers/uuid');

describe('uuid', () => {
    it('should be equal to 16 characters', () => {
        const id = uuid();
        expect(id).to.have.lengthOf(36);
    });
});