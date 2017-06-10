/**
 * Created by dannyyassine on 2017-06-08.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class HomeContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            projects: []
        }

    }

    componentDidMount() {
        this.onLoad();
    }

    onLoad = () => {
        fetch('http://localhost:3002/api/data', {
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({
                'projects': json.data.projects
            })
        });
    }

    render() {

        let projects = this.state.projects.map((project, index) => {
            return(
                <li key={project.id}>
                    <div >{project.name}</div>
                </li>
            )
        })

        return(
            <div>
                <ul>
                    {projects}
                </ul>
            </div>
        )
    }
}

