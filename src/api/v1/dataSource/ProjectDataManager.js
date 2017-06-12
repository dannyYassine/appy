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
            })
        })
    }

    const saveData = function (data, callback) {
        fs.writeFile(dataPath, JSON.stringify(data), (error) => {
            callback(error);
        });
    }

    const loadAllProjects = function(callback) {
        fs.readFile("./src/data.json", (error, data) => {
            let dataObject = JSON.parse(data);
            callback(dataObject)
        })
    }

    const loadProjectData = function(projectId, callback) {
        fs.readFile("./src/data.json", (error, data) => {
            let dataObject = JSON.parse(data);
            const project = dataObject.projects.filter((project) => {
                return project.id == projectId
            })[0];
            callback(project)
        })
    }

    const saveNewProject = function(project, callback) {
        loadData().then((data) => {
            data.projects.push(project);
            saveData(data, callback);
        }).catch((error) => {

        });
    }

    return {
        loadAllProjects,
        loadProjectData,
        saveNewProject
    }

})();

module.exports = ProjectDataManager;
