/**
 * Created by dannyyassine on 2017-06-23.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ConsoleOutput extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return(
            <div>
                <pre id="logged-text">{this.props.output}</pre>
            </div>
        )
    }

}