/**
 * Created by dannyyassine on 2017-06-17.
 */

const expect = require('chai').expect;
const Repository = require('../../../src/core/models/repository');

describe('Repository', () => {
    it('should not contain null properties', () => {
        let repository = new Repository();
        expect(repository.branch).to.be.equal('');
        expect(repository.source).to.be.equal('');
    });
});