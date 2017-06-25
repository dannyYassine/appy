/**
 * Created by dannyyassine on 2017-06-20.
 */
process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const assert = require('chai').assert;
const rmDir = require('../../../src/core/helpers/directory');
const fs = require('fs');

describe('directorySync', () => {

    const directoryPath = __dirname + '/cache';
    const fileName = 'cache.txt';
    const filePath = directoryPath + '/' + fileName;

    before(() => {
        if (fs.existsSync(directoryPath)) {
            rmDir.removeDirectory(directoryPath);
        }
        fs.mkdirSync(directoryPath);
        fs.writeFileSync(filePath, 'hello world');
    });

    after(() => {
        if (fs.existsSync(directoryPath)) {
            rmDir.removeDirectory(directoryPath);
        }
    });

    it('should delete contents of a directory', () => {
        rmDir.removeContentsOfDirectory(directoryPath);
        const mustBeFalse = fs.existsSync(filePath);
        assert(mustBeFalse === false);
    });

    it('should delete the directory', () => {
        rmDir.removeDirectory(directoryPath);
        const mustBeFalse = fs.existsSync(directoryPath);
        assert(mustBeFalse === false);
    });
});