/**
 * Created by dannyyassine on 2017-06-08.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HomeList from './../presentation/HomeList'
import ConsoleOutputContainer from './../../components/containers/ConsoleOutputContainer'

export default class HomeContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            currentProject: null
        }
        
    }

    // LIFE CYCLE
    componentDidMount() {
        this.onLoad();
    }

    onLoad = () => {
        fetch('http://localhost:3002/api/projects', {
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({
                'projects': json.data
            })
        });
    };

    // ACTIONS
    /**
     * @param e UI Event
     */
    addNewProject = (e) => {
        e.preventDefault();
        this.props.history.replace('/projects/add')
    };

    /**
     *
     * @param project
     */
    onProjectClicked = (project) => {
        this.setState({
            currentProject: project
        });
    };

    onEditProject = (project) => {
        this.props.history.replace(`/project/${project.id}`)
    };

    /**
     *
     * @param project
     */
    onDeleteProject = (project) => {
        fetch(`http://localhost:3002/api/project/${project.id}`, {
            method: "delete",
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((_) => {

            const projects = this.state.projects.filter((aProject, index) => {
                return project.id !== aProject.id;
            });

            this.setState({
                'projects': projects
            })
        }).catch(() => {
            alert('something went wrong');
        });
    };

    /**
     *
     * @param project
     */
    onBuildProject = (project) => {
        fetch(`http://localhost:3002/api/project/${project.id}/build`, {
            method: "POST",
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((_) => {
            this.state.projects.map((aProject, index) => {
                if (project.id === aProject.id) {
                    aProject.isRunning = !aProject.isRunning;
                }
            });
            this.setState({
                projects: this.state.projects,
                currentProject: project
            })
        });
    };

    /**
     *
     * @param project
     */
    onCancelProject = (project) => {
        fetch(`http://localhost:3002/api/job/${project.pid}/cancel`, {
            method: "POST",
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((response) => {
            return response.json()
        }).then((json) => {

        });
    };

    render() {
        const currentProjectOutput = this.state.currentProject ?
            (<ConsoleOutputContainer project={this.state.currentProject}/>)
            :
            (<div/>);

        return(
            <div>
                <HomeList
                    projects={this.state.projects}
                    addNewProject={this.addNewProject}
                    onProjectClicked={this.onProjectClicked}
                    onDeleteProject={this.onDeleteProject}
                    onBuildProject={this.onBuildProject}
                    onEditProject={this.onEditProject}
                    onCancelProject={this.onCancelProject}
                />
                {currentProjectOutput}
            </div>
        )
    }
}

