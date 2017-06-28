/**
 * Created by dannyyassine on 2017-06-27.
 */

var events = require('events'),
    util = require('util');

/**
 * Mocking objects for Express server
 * @type {{Request, Response}}
 */
const mock = (function () {

    /**
     * Mocking Request
     * @inherits EventEmitter
     * @returns {{body: {}, locals: {}}}
     * @constructor
     */
    let Request = function() {
        let locals = {};
        let body = {};

        let request = {};
        request.__proto__ = new events.EventEmitter();
        request.locals = locals;
        request.body = body;

        return request;
    };

    /**
     * Mocking Response
     * @inherits EventEmitter
     * @returns {{json: json, status: status, getJson: getJson}}
     * @constructor
     */
    let Response = function() {

        let statusCode = -1;
        let jsonResponse = null;

        const json = function (jsonObject) {
            jsonResponse = jsonObject;
            this.emit('json');
        };
        const status = function (code) {
            statusCode = code;
        };
        const getJson = function () {
            return jsonResponse;
        };
        const send = function () {
            this.emit('send')
        };

        let response = {};
        response.__proto__ = new events.EventEmitter();
        response.json = json;
        response.status = status;
        response.getJson = getJson;
        response.send = send;

        return response;
    };

    return {
        Request,
        Response
    }

})();

module.exports = mock;