/**
 * Created by dannyyassine on 2017-06-10.
 */

import { ProjectDataManager } from './../dataSource/ProjectDataManager'

export const projectRoot = (request, response) => {
    let projectId = request.params.project_id
    let dataManager = new ProjectDataManager()
    dataManager.loadProjectData(projectId, (project) => {
        response.status(200).json(project)
    })
}

