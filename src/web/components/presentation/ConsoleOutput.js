/**
 * Created by dannyyassine on 2017-06-23.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ConsoleOutput extends Component {


    constructor(props) {
        super(props);
        this.shouldScrollToBottom = false;
        this.state = {
            shouldScrollToBottom: false
        }
    }

    componentWillUpdate() {
        this.shouldScrollToBottom = (window.innerHeight + window.scrollY) === document.body.scrollHeight;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentDidUpdate() {
        this.shouldScrollToBottom && window.scrollTo(0,document.body.scrollHeight);
    }

    render() {
        return(
            <div>
                <pre id="logged-text">{this.props.output}</pre>
            </div>
        )
    }

}