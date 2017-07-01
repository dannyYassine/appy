/**
 * Created by dannyyassine on 2017-06-25.
 */

const getSettings = require('./../useCases/GetSettings');

/**
 * Settings Controller factory function
 * @param dataSource
 */
const settings = function (dataSource) {

    /**
     * Retrieve configuration settings for CI
     * @param request
     * @param response
     */
    const environmentSettings = (request, response) => {
        getSettings({
            dataSource: dataSource
        })
            .then((settingsConfig) => {
                response.json({data: settingsConfig});
            })
            .catch(() => {
                response.status(400).json({error: Error()});
            });
    };

    return {
        environmentSettings
    }

};

module.exports = settings;