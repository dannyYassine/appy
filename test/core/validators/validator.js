/**
 * Created by dannyyassine on 2017-06-22.
 */

const expect = require('chai').expect;
const assert = require('chai').assert;
const validateAll = require('../../../src/core/validators/validator');

describe('Validator', () => {
    it('should iterate injected validators', () => {
        const mockTrueValidator = {};
        mockTrueValidator.validate = function () {
            return true;
        };

        const mockFalseValidator = {};
        mockFalseValidator.validate = function () {
            return false;
        };

        let result = validateAll({}, [mockFalseValidator]);
        assert(result === false);

        result = validateAll({}, [mockTrueValidator]);
        assert(result === true);

        result = validateAll({}, [mockFalseValidator, mockTrueValidator]);
        assert(result === false);
    });
});