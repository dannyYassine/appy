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
            repoEnabled: props.project.repo.enabled,
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
        this.props.onUpdateProject(this._applyChangesToProject());
    };

    onNameChange = (event) => {
        const name = event.target.value;
        let project = this.state.project;
        project.name = name;
        this.setState({
            project: project
        })
    };

    applyChanges = (event) => {
        event.preventDefault();
        this.props.onApplyProject(this._applyChangesToProject());
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
        project.repo.source = text;
        this.setState({
            project: project
        })
    };

    onGitBranchChange = (event) => {
        const text = event.target.value;
        let project = Object.assign({}, this.state.project);
        project.repo.branch = text;
        this.setState({
            project: project
        })
    };

    _applyChangesToProject = () => {
        let project = Object.assign({}, this.state.project);
        project.shellTask.script = this.editor.getValue();
        project.repo.enabled = this.state.repoEnabled;
        return project;
    };

    _repoForm = (project) => {
        return(
            <div>
                <form onSubmit={this.cancelEvent}>
                    <div>
                        <label>Git Source</label>
                        <input type="text" width="200" placeholder="git url" value={project.repo.source} onChange={this.onGitSourceChange}/>
                    </div>
                    <div>
                        <label>Git branch</label>
                        <input type="text" placeholder="git branch" value={project.repo.branch} onChange={this.onGitBranchChange}/>
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
                <input type="checkbox" defaultChecked={this.state.repoEnabled} onChange={this.onRepoFormCheckboxChange} />
                {repoField}
                <h4>{this.props.project.updatedOn}</h4>
                <div className="bash">
                    <textarea id="code" className="shell-script" name="code">
                        {script}
                    </textarea>
                </div>
                <button onClick={this.submitScript}>SAVE</button>
                <button onClick={this.applyChanges}>APPLY</button>
            </div>
        )
    }

};

ProjectDetails.propTypes = {
    project: PropTypes.object.isRequired
};