/**
 * Created by dannyyassine on 2017-06-08.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class OutputLog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            log: ''
        }

    }

    componentDidMount() {
        this.onLoad();
    }

    onLoad = () => {
        fetch('http://localhost:3002/run-log', {
            headers : {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            console.log(json);
            this.setState({
                'log': json.log
            });
            window.scrollTo(0,document.body.scrollHeight);
            this.getLogOutput();
        });
    };

    getLogOutput = () => {
        fetch('http://localhost:3002/run-progressive-log', {
            headers : {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({
                'log': this.state.log += json.log
            })
            setTimeout(this.getLogOutput, 2000);
            if (json.log !== "") {
                window.scrollTo(0,document.body.scrollHeight);
            }
        });
    };

    render() {
        return(
            <div>
                <p>{this.state.log}</p>
            </div>
        )
    }
}

