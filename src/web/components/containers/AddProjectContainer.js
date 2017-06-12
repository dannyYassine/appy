/**
 * Created by dannyyassine on 2017-06-11.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddProjectForm from './../presentation/AddProjectForm'
import ProjectWebService from './../../data/services/ProjectWebService'

export default class AddProjectContainer extends Component {

    constructor(props) {
        super(props);

    }

    // ACTIONS

    onSubmitForm(projectName) {
        const projectWebService = new ProjectWebService();
        projectWebService.POST().addNewProject(projectName);
        projectWebService.execute((success) => {
            console.log('success');
            this.props.history.push('/');
        }, (error) => {
            alert("there was an error, try again");
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