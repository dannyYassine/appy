/**
 * Created by dannyyassine on 2017-06-21.
 */

/**
 * implements Validator Protocol
 * @returns {{nameValidator: nameValidator, validate: validate}}
 */
const nameValidator = function() {

    /**
     * Validates object name propertie
     * @param name
     * @returns {boolean}
     */
    const nameValidator = function(name) {
        return name !== '' && name !== null;
    };

    /**
     * PROTOCOL of Validator class
     * @param object
     */
    const validate = function(object) {
        return nameValidator(object.name);
    };

    return {
        validate
    };
};

/**
 * implements Validator Protocol
 * @returns {{validate: validate}}
 */
const scriptValidator = function() {

    /**
     * Validates object script property
     * @param script
     * @returns {boolean}
     */
    const scriptValidator = function(script) {
        return name !== '' && name !== null;
    };

    /**
     * PROTOCOL of Validator class
     * @param object
     */
    const validate = function(object) {
        return scriptValidator(object.script);
    };

    return {
        validate
    };
};

module.exports = {
    nameValidator,
    scriptValidator
};