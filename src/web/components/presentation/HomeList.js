/**
 * Created by dannyyassine on 2017-06-10.
 */

import React, { Component } from 'react'
import HomeListFooter from './pureComponents/HomeListFooter'
import PropTypes from 'prop-types'

export default class HomeList extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let projects = this.props.projects.map((project, index) => {
            return(
                <li key={project.id}>
                    <div >{project.name}</div>
                </li>
            )
        })

        return(
        <div>
            <div>
                <ul>
                    {projects}
                </ul>
            </div>
            <HomeListFooter addNewProject={this.props.addNewProject}/>
        </div>

        )
    }

}