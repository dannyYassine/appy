/**
 * Created by dannyyassine on 2017-06-12.
 */

const { nameValidator, scriptValidator } = require('./../../../core/validators/projectValidator');
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

        let validated = validateAll(project, [
            nameValidator(),
            scriptValidator()
        ]);

        if (validated === false) {
            return reject(Error('wrong updated arguments'));
        }

        dataSource.updateProject(project)
            .then((updatedProject) => {
                resolve(updatedProject);
            })
            .catch(reject);
    });
};

module.exports = updateProject;