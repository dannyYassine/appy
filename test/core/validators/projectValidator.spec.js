/**
 * Created by dannyyassine on 2017-06-22.
 */

const expect = require('chai').expect;
const assert = require('chai').assert;
const Project = require('../../../src/core/models/project');
const projectNameValidator = require('../../../src/core/validators/projectValidator');
const validateAll = require('../../../src/core/validators/validator');

describe('Project Validator', () => {
    it('should validate a project\'s name to TRUE', () => {

        let project = new Project();
        project.name = "Hello world";

        let result = validateAll(project, [projectNameValidator()]);
        assert(result === true);
    });

    it('should validate a project\'s name to FALSE', () => {

        let project = new Project();
        project.name = "";

        let result = validateAll(project, [projectNameValidator()]);
        assert(result === false);

        project.name = null;

        result = validateAll(project, [projectNameValidator()]);
        assert(result === false);
    });
});