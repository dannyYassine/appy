/**
 * Created by dannyyassine on 2017-06-11.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddProjectForm from './../presentation/AddProjectForm'
import ProjectWebService from './../../data/services/ProjectWebService'
import swal from 'sweetalert2'

export default class AddProjectContainer extends Component {

    constructor(props) {
        super(props);
    }

    // ACTIONS
    onSubmitForm(projectName) {

        const projectWebService = new ProjectWebService();
        projectWebService.POST().addNewProject(projectName);
        projectWebService.execute((success) => {
            this.props.history.push('/');
        }, (error) => {
            swal({
                title: 'Error',
                text: `${error.message}`,
                type: 'error'
            })
        })
    }

    render() {
        return(
            <div>
                <AddProjectForm onSubmitForm={this.onSubmitForm.bind(this)}/>
            </div>
        )
    }

}