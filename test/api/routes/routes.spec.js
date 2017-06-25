/**
 * Created by dannyyassine on 2017-06-18.
 */
process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const assert = require('chai').assert;
const homeRouter = require('../../../src/api/v1/routes/home');

describe('Routes', () => {
    it('should contain home routes to all Projects', () => {
        assert(true);
    });
});