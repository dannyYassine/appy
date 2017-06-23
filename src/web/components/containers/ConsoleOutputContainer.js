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
            output: 'qwe'
        }
    }

    componentDidMount() {
        this.onLoad()
    }

    onLoad() {
        // fetch(`http://localhost:3002/project/${this.props.match}`, {
        //
        // }).then((response) => {
        //     return response.json();
        // }).then((json) => {
        //     let loggedText = document.getElementById("logged-text");
        //     loggedText.innerText += json.log;
        //     window.scrollTo(0,document.body.scrollHeight);
        //     this.getLogOutput();
        // }).catch(() => {
        //     this.getLogOutput();
        // });
    }

    getLogOutput() {
        fetch('http://localhost:3002/run-progressive-log', {

        }).then((response) => {
            return response.json();
        }).then((json) => {
            let loggedText = document.getElementById("logged-text");
            loggedText.innerText += json.log;
            setTimeout(getLogOutput, 2000);
            if (json.log !== "") {
                window.scrollTo(0,document.body.scrollHeight);
            }
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
                <ConsoleOutput output={this.state.output}/>
            </div>
        )
    }

}