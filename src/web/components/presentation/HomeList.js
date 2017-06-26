/**
 * Created by dannyyassine on 2017-06-10.
 */

import React, { Component } from 'react'
import HomeListFooter from './pureComponents/HomeListFooter'
import PropTypes from 'prop-types'
import swal from 'sweetalert2'

export default class HomeList extends Component {

    constructor(props) {
        super(props)
    }

    onRowClick(project) {
        this.props.onProjectClicked(project);
    }

    onDelete(project) {
        swal({
            title: `Are you sure to delete \"${project.name}\"?`,
            text: "You will be removing it permanently",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it'
        }).then(() => {
            this.props.onDeleteProject(project);
        });
    }
    
    onCancel(project) {
        swal({
            title: `Are you sure to stop \"${project.name}\"?`,
            text: "You will be stoping the task",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, stop the build'
        }).then(() => {
            this.props.onCancelProject(project);
        });
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
                    <td><button onClick={e => this.onDelete(project)}>DELETE</button></td>
                    <td><button onClick={e => this.props.onBuildProject(project)}>BUILD</button></td>
                    <td><button onClick={e => this.props.onEditProject(project)}>EDIT</button></td>
                    <td><button onClick={e => this.onCancel(project)}>CANCEL</button></td>
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