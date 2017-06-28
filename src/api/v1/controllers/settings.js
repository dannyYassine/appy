/**
 * Created by dannyyassine on 2017-06-25.
 */

const getSettings = require('./../useCases/GetSettings');

/**
 *
 * @param dataSource
 */
const settings = function (dataSource) {

    /**
     *
     * @param request
     * @param response
     */
    const environmentSettings = (request, response) => {
        getSettings({
            dataSource: dataSource
        })
            .then(() => {
                response.json({data: "1"});
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