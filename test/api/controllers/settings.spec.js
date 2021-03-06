/**
 * Created by dannyyassine on 2017-06-27.
 */

const chai      = require('chai');
const expect    = chai.expect;
const assert    = chai.assert;

const settingsFactory = require('./../../../src/api/v1/controllers/settings');
const mock = require('./../../mock');

describe('Server/Controllers/Settings', () => {

    it('should respond to get settings', (done) => {

        const mock_dataSource = {
            retrieveSettings() {
                return new Promise((resolve, _) => {
                    let mock_settings = {};
                    resolve(mock_settings);
                });
            }
        };

        let settingsController = settingsFactory(mock_dataSource);

        let mocker = {};
        mocker.request = mock.Request();
        mocker.response = mock.Response();

        settingsController.environmentSettings(mocker.request, mocker.response);

        mocker.response.on('json', () => {
            assert(mocker.response.getJson().data !== null);
            done();
        });

    });

    it('should fail to get settings', (done) => {

        const mock_dataSource = {
            retrieveSettings() {
                return new Promise((_, reject) => {
                    reject();
                });
            }
        };

        let settingsController = settingsFactory(mock_dataSource);

        let mocker = {};
        mocker.request = mock.Request();
        mocker.response = mock.Response();

        settingsController.environmentSettings(mocker.request, mocker.response);

        mocker.response.on('json', () => {
            assert(mocker.response.getStatus() === 400);
            assert(mocker.response.getJson !== null);
            done();
        });

    });


});