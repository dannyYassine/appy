/**
 * Created by dannyyassine on 2017-06-22.
 */

const expect = require('chai').expect;
const assert = require('chai').assert;

describe('Server', () => {
    it('should be not null', () => {
       const app = require('./../src/server');
       expect(app !== null);
    });
});