/**
 * Created by dannyyassine on 2017-06-11.
 */

import { HTTPService }from './HTTPService'

export default class ProjectWebService extends HTTPService {

    constructor() {
        super();
        this.url = "http://localhost:3002/api";
    }

    addNewProject(projectName) {
        this.url = this.url + "/projects/add";
        this.addHeader('Accept', 'application/json');
        this.addHeader('Content-Type', 'application/json');
        this.addParameter("project_name", projectName);
    }

}

