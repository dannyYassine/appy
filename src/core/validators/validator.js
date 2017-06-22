/**
 * Created by dannyyassine on 2017-06-21.
 */

/**
 * Verifies all injected validators to validated the object passed as the first arguments
 * @param object
 * @param arrayOfValidators
 * @returns {boolean}
 */
const validateAll = function(object, arrayOfValidators) {

    let validated = true;
    for (const index in arrayOfValidators) {
        const validator = arrayOfValidators[index];
        validated = validator.validate(object);
        if (validated === false) {
            return validated;
        }
    }
    return validated;
};

module.exports = validateAll;