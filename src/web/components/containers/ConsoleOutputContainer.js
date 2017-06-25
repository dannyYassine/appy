/**
 * Created by dannyyassine on 2017-06-23.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProjectWebService from './../../data/services/ProjectWebService'
import ConsoleOutput from './../../components/presentation/ConsoleOutput'

export default class AddProjectContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            output: 'qwe',
            project: props.project
        }
    }

    componentDidMount() {
        this.onLoad()
    }

    componentWillReceiveProps(nextProps) {
        this.downloadProjectLog(nextProps.project);
    }

    onLoad() {
        this.downloadProjectLog(this.props.project);
    }

    downloadProjectLog(project) {
        fetch(`http://localhost:3002/api/project/${project.id}/log`, {
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            console.log(json);
            this.setState({
                log: json.data
            });
            this.getLogOutput(project);
        }).catch(() => {
            this.getLogOutput(project);
        });
    }

    getLogOutput(project) {
        fetch(`http://localhost:3002/api/project/${project.id}/progressive-log`, {
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({
                log: this.state.log + "\n" + json.data
            });
            setTimeout(getLogOutput, 2000);
        }).catch(() => {
            setTimeout(getLogOutput, 2000);
        });
    };

    cancelProcess() {

        fetch('http://localhost:3002/' + pid.toString() + '/cancel', {
            method: 'POST'
        }).then((response) => {
            return response.json();
        }).then((json) => {
            console.log(json);
        });
    }

    render() {
        return(
            <div>
                <h1>{this.props.project.name}</h1>
                <ConsoleOutput output={this.state.log}/>
            </div>
        )
    }

}