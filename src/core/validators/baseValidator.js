/**
 * Created by dannyyassine on 2017-07-02.
 */

const BaseValidator = function () {

    let error = null;
    /**
     * PROTOCOL of Validator class
     * @param object
     */
    const validate = function(object) {
        throw new Error("should override method");
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
        getError,
    }
};

module.exports = BaseValidator;