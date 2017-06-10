/**
 * Created by dannyyassine on 2017-06-10.
 */

import fs from 'fs'

export const ProjectDataManager = function() {

    this.loadProjectData = function(projectId, callback) {
        fs.readFile("./src/data.json", (error, data) => {
            let dataObject = JSON.parse(data);
            const project = dataObject.projects.filter((project) => {
                return project.id == projectId
            })[0];
            callback(project)
        })
    }

}

