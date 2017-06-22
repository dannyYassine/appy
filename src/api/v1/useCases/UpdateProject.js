/**
 * Created by dannyyassine on 2017-06-12.
 */

const projectNameValidator = require('./../../../core/validators/projectValidator');
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

        let validated = validateAll(project, [projectNameValidator()]);

        if (validated === false) {
            reject(Error('wrong updated arguments'));
        }

        //Validate name
        project.name = name;

        dataSource.updateProject(project)
            .then((updatedProject) => {
                resolve(updatedProject);
            })
            .catch(reject);
    });
};

module.exports = updateProject;