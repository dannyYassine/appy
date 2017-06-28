/**
 * Created by dannyyassine on 2017-06-18.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectDetails from '../presentation/ProjectDetails';
import ProjectWebService from './../../data/services/ProjectWebService'

export default class ProjectDetailsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: null
        };
    }

    componentDidMount() {
        this.onLoad();
    }

    onLoad = () => {
            fetch(`http://localhost:3002/api/project/${this.props.match.params.project_id}`, {
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({
                'project': json.data
            })
        });
    };

    onUpdateProject = (project) => {
        const body = {
            name: project.name,
            script: JSON.stringify(project.shellTask.script)
        };
        const projectWebService = new ProjectWebService();
        projectWebService.PUT().updateProject(project, body);
        projectWebService.execute((success) => {
            console.log('success');
            this.props.history.push('/');
        }, (error) => {
            alert(error.code);
        });
    };

    render() {
        const playerDetail = this.state.project ?
            (<ProjectDetails
                project={this.state.project}
                onUpdateProject={this.onUpdateProject.bind(this)}
                />)
            :
            (<div>
                <p>Loading</p>
            </div>);
        return(
            <div>
                {playerDetail}
            </div>
        )
    }

}