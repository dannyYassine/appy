/**
 * Created by dannyyassine on 2017-06-18.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ProjectDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            project: props.project,
            repoEnabled: props.project.shellTask.enabled,
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
        let project = Object.assign({}, this.state.project);
        project.shellTask.script = this.editor.getValue();
        project.shellTask.enabled = this.state.repoEnabled;

        this.props.onUpdateProject(project);
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

    cancelEvent = (event) => {
        event.preventDefault();
    };

    onRepoFormCheckboxChange = (event) => {
        this.setState({
            repoEnabled: !this.state.repoEnabled
        });
    };

    onGitSourceChange = (event) => {
        const text = event.target.value;
        let project = Object.assign({}, this.state.project);
        project.shellTask.source = text;
        this.setState({
            project: project
        })
    };

    onGitBranchChange = (event) => {
        const text = event.target.value;
        let project = Object.assign({}, this.state.project);
        project.shellTask.branch = text;
        this.setState({
            project: project
        })
    };

    _repoForm = (project) => {
        return(
            <div>
                <form onSubmit={this.cancelEvent}>
                    <div>
                        <label>Git Source</label>
                        <input type="text" width="200" placeholder="git url" value={project.shellTask.source} onChange={this.onGitSourceChange}/>
                    </div>
                    <div>
                        <label>Git branch</label>
                        <input type="text" placeholder="git branch" value={project.shellTask.branch} onChange={this.onGitBranchChange}/>
                    </div>
                </form>
            </div>
        );
    };

    render() {
        let script = this.props.project.shellTask.script.length > 0 ? this.props.project.shellTask.script: "";
        let repoField = this.state.repoEnabled ? this._repoForm(this.props.project) : (<div/>);

        return(
            <div className="content">
                <form onSubmit={this.cancelEvent}>
                    <input type="text" placeholder="Project name" value={this.state.project.name} onChange={this.onNameChange}/>
                </form>
                <input type="checkbox" onChange={this.onRepoFormCheckboxChange}/>
                {repoField}
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