/**
 * Created by dannyyassine on 2017-06-22.
 */
process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const assert = require('chai').assert;
const Project = require('../../../src/core/models/project');
const {nameValidator, scriptValidator} = require('../../../src/core/validators/projectValidator');
const validateAll = require('../../../src/core/validators/validator');

describe('Project Validator', () => {
    it('should validate a project\'s name to TRUE', () => {

        let project = new Project();
        project.name = "Hello world";

        let result = validateAll(project, [nameValidator()]);
        assert(result === true);
    });

    it('should validate a project\'s name to FALSE', () => {

        let project = new Project();
        project.name = "";

        let result = validateAll(project, [nameValidator()]);
        assert(result === false);

        project.name = null;

        result = validateAll(project, [nameValidator()]);
        assert(result === false);
    });

    it('should validate a project\'s script to TRUE', () => {

        let project = new Project();
        project.shellTask.script = "Hello world";

        let result = validateAll(project, [scriptValidator()]);
        assert(result === true);
    });

    it('should validate a project\'s script to FALSE', () => {

        let project = new Project();
        project.shellTask.script = "";

        let result = validateAll(project, [scriptValidator()]);
        assert(result === false);

        project.name = null;

        result = validateAll(project, [scriptValidator()]);
        assert(result === false);
    });

});