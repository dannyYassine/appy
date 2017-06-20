/**
 * Created by dannyyassine on 2017-06-10.
 */

const fs = require('fs');

const ProjectDataManager = (function () {

    const dataPath = './src/data.json';

    const loadData = function () {
        return new Promise(function (resolve, reject) {
            fs.readFile(dataPath, (error, data) => {
                if (error) reject(Error('no data'));
                resolve(JSON.parse(data.toString()));
            });
        });
    };

    const saveData = function (data) {
        return new Promise(function (resolve, reject) {
            fs.writeFile(dataPath, JSON.stringify(data), (error) => {
                if (error) reject(Error());
                resolve();
            });
        });
    };

    const loadProject = (projectId) => {
        return new Promise(function (resolve, reject) {
            loadData().then((data) => {
                let project = data.projects.filter((enumeratedProject) => {
                    return enumeratedProject.id === projectId;
                });
                if (project) resolve(project);
                reject(Error());
            }).catch(() => {
                reject(Error("no project"));
            });
        });
    };

    const loadAllProjects = function(callback) {
        fs.readFile("./src/data.json", (error, data) => {
            let dataObject = JSON.parse(data);
            callback(dataObject);
        });
    };

    const loadProjectData = function(projectId, callback) {
        fs.readFile("./src/data.json", (error, data) => {
            let dataObject = JSON.parse(data);
            const project = dataObject.projects.filter((project) => {
                return project.id == projectId;
            })[0];
            callback(project);
        });
    };

    const saveNewProject = function(project, callback) {
        loadData().then((data) => {
            data.projects.push(project);
            saveData(data, callback);
        }).catch((error) => {
            callback(null, error);
        });
    };

    const updateProject = (updateProject) => {
        return new Promise(function (resolve, reject) {
            loadData().then((data) => {
                for (let i = 0; i <= data.projects.length; i++) {
                    let project = data.projects[i];
                    if (project.id === updateProject.id) {
                        data.projects[i] = updateProject;
                        break;
                    }
                }
                saveData(data).then(() => {
                    resolve(updateProject);
                });
            }).catch(reject);
        });
    };

    const deleteProject = (projectId) => {
        return new Promise(function (resolve, reject) {
            loadData().then((data) => {
                console.log(data.projects.length);
                for (let i = 0; i < data.projects.length; i++) {
                    let project = data.projects[i];
                    if (project.id == projectId) {
                        data.projects = data.projects.filter((aProject) => {
                            return aProject.id !== projectId;
                        });
                        break;
                    }
                }
                saveData(data).then(() => {
                    resolve();
                });
            }).catch(reject);
        });
    };

    return {
        loadAllProjects,
        loadProjectData,
        saveNewProject,
        updateProject,
        deleteProject,
        loadProject
    };

}());

module.exports = ProjectDataManager;
