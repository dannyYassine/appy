/**
 * Created by dannyyassine on 2017-06-18.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ProjectDetails extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const editor = CodeMirror.fromTextArea(document.getElementById('code'), {
            mode: 'shell',
            lineNumbers: true,
            matchBrackets: true,
            styleActiveLine: true,
            viewportMargin: 20,
            theme: 'monokai'
        });
        this.editor = editor;
    }

    submitScript = (event) => {
        console.log(this.editor.getValue());
        fetch('http://localhost:3002/submit-script', {
            method: 'POST',
            headers : {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'text': this.editor.getValue()})
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response.redirect);
        }).catch((response) => {
            console.log(response);
        });
    };
    runScript = (event) => {
        window.location = "http://localhost:3002/run-script";
    };

    render() {
        return(
            <div className="content">
                <h4>{this.props.project.name}</h4>
                <h4>{this.props.project.updatedOn}</h4>
                <div className="bash">
    <textarea id="code" className="shell-script" name="code">
        {this.props.project.name}
    </textarea>
                </div>
                <button onClick={this.submitScript}>SAVE</button>
                <button onClick={this.runScript}>RUN</button>
            </div>
        )
    }

};