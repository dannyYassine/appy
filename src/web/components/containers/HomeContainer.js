/**
 * Created by dannyyassine on 2017-06-08.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HomeList from './../presentation/HomeList'

export default class HomeContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            projects: []
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
            console.log(json);
            this.setState({
                'projects': json.data.projects
            })
        });
    }

    // ACTIONS
    /**
     * @param e UI Event
     */
    addNewProject = (e) => {
        e.preventDefault()
        this.props.history.replace('/projects/add')
    }

    render() {
        return(
            <HomeList
                projects={this.state.projects}
                addNewProject={this.addNewProject}
            />
        )
    }
}

