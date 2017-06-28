/**
 * Created by dannyyassine on 2017-06-27.
 */

/**
 * Mocking objects for Express server
 * @type {{Request, Response}}
 */
const mock = (function () {

    /**
     * Mocking Request
     * @returns {{body: {}, locals: {}}}
     * @constructor
     */
    let Request = function() {
        let locals = {};
        let body = {};

        return {
            body,
            locals
        }
    };

    /**
     * Mocking Response
     * @returns {{json: json, status: status, getJson: getJson}}
     * @constructor
     */
    let Response = function() {

        let statusCode = -1;
        let jsonResponse = null;

        const json = function (jsonObject) {
            jsonResponse = jsonObject;
        };
        const status = function (code) {
            statusCode = code;
        };
        const getJson = function () {
            return jsonResponse;
        };
        return {
            json,
            status,
            getJson,
        }
    };

    return {
        Request,
        Response
    }

})();

module.exports = mock;