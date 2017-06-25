/**
 * Created by dannyyassine on 2017-06-12.
 */

const nameValidator = require('./../../../core/validators/projectValidator').nameValidator;
const validateAll = require('./../../../core/validators/validator');

/**
 * Business rules to validate if project can be updated
 * @param project
 * @param options
 * @param dataSource
 * @returns {Promise}
 */
const updateProject = function ({project, options, dataSource}) {
    return new Promise((resolve, reject) => {

        const name = options.name;
        project.name = name;
        project.shellTask.script = options.script;

        let validated = validateAll(project, [nameValidator()]);

        if (validated === false) {
            reject(Error('wrong updated arguments'));
        }

        dataSource.updateProject(project)
            .then((updatedProject) => {
                resolve(updatedProject);
            })
            .catch(reject);
    });
};

module.exports = updateProject;