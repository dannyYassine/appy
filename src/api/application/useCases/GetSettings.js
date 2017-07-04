/**
 * Created by dannyyassine on 2017-06-27.
 */

module.exports = function({dataSource}) {
    return new Promise((resolve, reject) => {
        dataSource.retrieveSettings()
            .then((settings) => {
                resolve(settings);
            })
            .catch((err) => {
                reject(err);
            })
    });
};