/**
 * Created by dannyyassine on 2017-06-18.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectDetails from '../presentation/ProjectDetails';

export default class ProjectDetailsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: {}
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
            console.log(json);
            this.setState({
                'project': json.data
            })
        });
    };

    render() {
        return(
            <div>
                <ProjectDetails project={this.state.project}/>
            </div>
        )
    }

}