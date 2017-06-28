/**
 * Created by dannyyassine on 2017-06-18.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ProjectDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: props.project
        }
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
        event.preventDefault();
        this.state.project.shellTask.script = this.editor.getValue();
        this.props.onUpdateProject(this.state.project);
    };

    onNameChange = (event) => {
        const name = event.target.value;
        let project = this.state.project;
        project.name = name;
        this.setState({
            project: project
        })
    };

    runScript = (event) => {

    };

    render() {
        let script = this.props.project.shellTask.script.length > 0 ? JSON.parse(this.props.project.shellTask.script): "";
        return(
            <div className="content">
                <form onSubmit={this.addProject}>
                    <input type="text" placeholder="Project name" value={this.state.project.name} onChange={this.onNameChange}/>
                </form>
                <h4>{this.props.project.updatedOn}</h4>
                <div className="bash">
                    <textarea id="code" className="shell-script" name="code">
                        {script}
                    </textarea>
                </div>
                <button onClick={this.submitScript}>SAVE</button>
                <button onClick={this.runScript}>BUILD</button>
            </div>
        )
    }

};

ProjectDetails.propTypes = {
    project: PropTypes.object.isRequired
};