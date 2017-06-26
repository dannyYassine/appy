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
                'Accept': '"text/plain"',
                'Content-Type': '"text/plain"'
            }
        }).then((response) => {
            return response.text();
        }).then((text) => {
            if (text !== '') {
                this.setState({
                    log: text
                });
            }
            this.getLogOutput(project);
        }).catch(() => {
            this.getLogOutput(project);
        });
    }

    getLogOutput(project) {
        if (!project.isRunning) {
            return;
        }

        fetch(`http://localhost:3002/api/project/${project.id}/progressive-log`, {
            headers : {
                'Accept': '"text/plain"',
                'Content-Type': '"text/plain"'
            }
        }).then((response) => {
            return response.text();
        }).then((text) => {
            if (text !== '') {
                this.setState({
                    log: text + "\n" + this.state.log
                });
            }
            setTimeout(this.logOutput.bind(this), 2000);
        }).catch((err) => {
            console.log(err);
            setTimeout(this.logOutput.bind(this), 2000);
        });
    };

    logOutput() {
        this.getLogOutput(this.props.project);
    }

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