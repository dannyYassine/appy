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
                project: json.data
            })
        });
    };

    onUpdateProject = (project) => {
        const body = {
            name: project.name,
            repo: JSON.stringify(project.repo),
            shellTask: JSON.stringify(project.shellTask)
        };
        const projectWebService = new ProjectWebService();
        projectWebService.PUT().updateProject(project, body);
        projectWebService.execute((success) => {
            this.props.history.push('/');
        }, (error) => {
            alert(error.code);
        });
    };

    onApplyProject = (project) => {
        const body = {
            name: project.name,
            repo: JSON.stringify(project.repo),
            shellTask: JSON.stringify(project.shellTask)
        };
        console.log(body);
        const projectWebService = new ProjectWebService();
        projectWebService.PUT().updateProject(project, body);
        projectWebService.execute((success) => {
            swal({
                title: `Changes applied`,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then(() => {
            });
        }, (error) => {
            alert(error.code);
        });
    };

    render() {
        const playerDetail = this.state.project ?
            (<ProjectDetails
                project={this.state.project}
                onUpdateProject={this.onUpdateProject.bind(this)}
                onApplyProject={this.onApplyProject.bind(this)}
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