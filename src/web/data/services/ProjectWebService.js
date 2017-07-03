/**
 * Created by dannyyassine on 2017-06-11.
 */

import { HTTPService }from './HTTPService'

export default class ProjectWebService extends HTTPService {

    constructor() {
        super();
        this.url = "http://localhost:3002/api";
        this.addHeader('Accept', 'application/json');
        this.addHeader('Content-Type', 'application/json');
    }

    addNewProject(projectName) {
        this.url = this.url + "/projects/add";
        this.addParameter("project_name", projectName);
    }

    updateProject(project, options) {
        this.url = this.url + `/project/${project.id}/edit`;
        this.addParameter('name', options.name);
        this.addParameter('repo', options.repo);
        this.addParameter('shell_task', options.shellTask);
    }

}

