/**
 * Created by dannyyassine on 2017-06-11.
 */
import swal from 'sweetalert2'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AddProjectForm extends Component {

    constructor(props) {

        super(props);
        this.state = {
            name:''
        }
    }

    addProject = (event) => {
        if (event) event.preventDefault();
        const name = this.state.name;
        swal({
            title: `Create a new job with name \"${name}\"`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(() => {
            this.props.onSubmitForm(name);
            this.setState({name: ''});
        });

    };

    onNameChange = (event) => {
        const name = event.target.value;
        this.setState({name: name});
    };

    render() {
        return(
            <div>
                <form onSubmit={this.addProject}>
                    <input type="text" placeholder="Project name" onChange={this.onNameChange}/>
                    <input type="submit" value="ADD"/>
                </form>
            </div>
        )
    }

}

AddProjectForm.propTypes = {
    onSubmitForm: PropTypes.func.isRequired
};

export default AddProjectForm