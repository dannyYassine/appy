/**
 * Created by dannyyassine on 2017-06-21.
 */

const BaseValidator = require('./baseValidator');

/**
 * inherits BaseValidator class
 * @returns {{nameValidator: nameValidator, validate: validate}}
 */
const nameValidator = function() {

    let nameValidator = {};
    let error = null;

    /**
     * inherit from baseValidator
     */
    nameValidator.__proto__ = BaseValidator();

    /**
     * Validates object name propertie
     * @param name
     * @returns {boolean}
     */
    const nameVal = function(name) {
        if (name !== '' && name !== null && name !== undefined) {
            return true;
        }
        error = Error("name is invalid");
        return false;
    };

    /**
     * PROTOCOL of Validator class
     * @param object
     */
    nameValidator.validate = (object) => {
        return nameVal(object.name);
    };

    return nameValidator;
};

/**
 * inherits BaseValidator class
 * @returns {{validate: validate}}
 */
const scriptValidator = function() {

    let scriptValidator = {};
    let error = null;

    /**
     * inherit from baseValidator
     */
    scriptValidator.__proto__ = BaseValidator();

    /**
     * Validates object script property
     * @param script
     * @returns {boolean}
     */
    const script = function(script) {
        if (script !== '' && script !== null && script !== undefined) {
            return true;
        }
        error = Error("script is invalid");
        return false;
    };

    /**
     * PROTOCOL of Validator class
     * @param object
     */
    scriptValidator.validate = function(object) {
        return script(object.shellTask.script);
    };

    return scriptValidator;
};

module.exports = {
    nameValidator,
    scriptValidator
};