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
            <div className="console">
                <p>{this.props.output}</p>
            </div>
        )
    }

}