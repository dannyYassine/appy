/**
 * Created by dannyyassine on 2017-06-10.
 */

const fs = require('fs');
const projectFileSystem = require('./../services/projectFileSystem');

const ProjectDataManager = (function () {

    let dataPath = null;

    /**
     * Getter for global module dataPath variable
     * @returns {string}
     */
    const getDataPath = function() {
        return dataPath;
    };

    /**
     * Injectable options
     * @param options
     */
    const setup = function(options) {
        dataPath = options.dataPath;
    };

    /**
     *
     * @returns {Promise}
     */
    const loadData = function () {
        return new Promise(function (resolve, reject) {
            fs.readFile(dataPath, (error, data) => {
                if (error) reject(Error('no data'));
                else resolve(JSON.parse(data.toString()));
            });
        });
    };

    /**
     *
     * @param data
     * @returns {Promise}
     */
    const saveData = function (data) {
        return new Promise(function (resolve, reject) {
            fs.writeFile(dataPath, JSON.stringify(data), (error) => {
                if (error) reject(Error());
                resolve(data);
            });
        });
    };

    /**
     *
     * @param callback
     */
    const loadAllProjects = function(callback) {
        loadData().then((data) => {
            callback(data);
        }).catch((error) => {
            callback(null);
        })
    };

    /**
     *
     * @param projectId
     * @param callback
     */
    const loadProjectData = function(projectId, callback) {
        fs.readFile(dataPath, (error, data) => {
            let dataObject = JSON.parse(data);
            const project = dataObject.projects.filter((project) => {
                return project.id == projectId;
            })[0];
            callback(project);
        });
    };

    /**
     *
     * @param project
     * @param callback
     */
    const saveNewProject = function(project, callback) {
        let allData;
        loadData().then((data) => {
            allData = data;
            return projectFileSystem.createProjectDirectory(project)
        }).then(() => {
            allData.projects.push(project);
            return saveData(allData);
        }).then((data) => {
            callback(data, null);
        }).catch((error) => {
            callback(null, error);
        });
    };

    /**
     *
     * @param updateProject
     * @returns {Promise}
     */
    const updateProject = (updateProject) => {
        return new Promise(function (resolve, reject) {
            loadData()
                .then((data) => {
                    for (let i = 0; i <= data.projects.length; i++) {
                        let project = data.projects[i];
                        if (project.id === updateProject.id) {
                            data.projects[i] = updateProject;
                            break;
                        }
                    }
                    return saveData(data);
                }).then((data) => {
                resolve(updateProject);
            }).catch(reject);
        });
    };

    /**
     *
     * @param projectId
     * @returns {Promise}
     */
    const deleteProject = (projectId) => {
        return new Promise(function (resolve, reject) {
            loadData().then((data) => {
                let foundProject;
                for (let i = 0; i < data.projects.length; i++) {
                    let project = data.projects[i];
                    if (project.id == projectId) {
                        foundProject = project;
                        break;
                    }
                }
                if (foundProject) {
                    projectFileSystem.deleteProjectDirectory(foundProject)
                        .then(() => {
                            data.projects = data.projects.filter((aProject) => {
                                return aProject.id !== foundProject.id;
                            });
                            saveData(data).then((data) => {
                                return resolve(data);
                            }).catch((error) => {
                                return reject(error);
                            });
                        })
                        .catch(reject)
                }
            }).catch(reject);
        });
    };

    return {
        getDataPath,
        setup,
        loadAllProjects,
        loadProjectData,
        saveNewProject,
        updateProject,
        deleteProject
    };
}());

module.exports = ProjectDataManager;
