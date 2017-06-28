/**
 * Created by dannyyassine on 2017-06-21.
 */

/**
 * implements Validator Protocol
 * @returns {{nameValidator: nameValidator, validate: validate}}
 */
const nameValidator = function() {

    let error = null;
    /**
     * Validates object name propertie
     * @param name
     * @returns {boolean}
     */
    const nameValidator = function(name) {
        return name !== '' && name !== null && name !== undefined;
    };

    /**
     * PROTOCOL of Validator class
     * @param object
     */
    const validate = function(object) {
        return nameValidator(object.name);
    };

    /**
     *
     * @returns {error}
     */
    const getError = function () {
        return error;
    };

    return {
        validate,
        getError
    };
};

/**
 * implements Validator Protocol
 * @returns {{validate: validate}}
 */
const scriptValidator = function() {

    let error = null;
    /**
     * Validates object script property
     * @param script
     * @returns {boolean}
     */
    const scriptValidator = function(script) {
        return script !== '' && script !== null && script !== undefined;
    };

    /**
     * PROTOCOL of Validator class
     * @param object
     */
    const validate = function(object) {
        return scriptValidator(object.shellTask.script);
    };

    /**
     *
     * @returns {error}
     */
    const getError = function () {
        return error;
    };

    return {
        validate,
        getError
    };
};

module.exports = {
    nameValidator,
    scriptValidator
};