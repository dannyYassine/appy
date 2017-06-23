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

    onRowClick(project) {
        this.props.onProjectClicked(project);
    }

    render() {
        let projects = this.props.projects.map((project, index) => {

            const spinner = project.isRunning ? (<div className="loader float-right"/>) : (<div/>);

            return(
                <tr key={index}>
                    <td className="td-spinner">
                        {spinner}
                    </td>
                    <td onClick={e => this.onRowClick(project)}>{project.name}</td>
                    <td>{project.updatedOn}</td>
                    <td><button onClick={e => this.props.onDeleteProject(project)}>DELETE</button></td>
                    <td><button onClick={e => this.props.onBuildProject(project)}>BUILD</button></td>
                </tr>
            )
        });

        return(
            <div>
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <th>  </th>
                            <th>Name</th>
                            <th>Last updated</th>
                        </tr>
                        {projects}
                        </tbody>
                    </table>
                </div>
                <HomeListFooter addNewProject={this.props.addNewProject}/>
            </div>

        )
    }

}