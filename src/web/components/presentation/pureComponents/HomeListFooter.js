/**
 * Created by dannyyassine on 2017-06-11.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

const HomeListFooter = (props) => {
    return(
        <div>
            <button onClick={props.addNewProject}>ADD PROJECT</button>
        </div>
    )
};

HomeListFooter.propTypes = {
    addNewProject: PropTypes.func.isRequired
};

export default HomeListFooter