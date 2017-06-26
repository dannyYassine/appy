/**
 * Created by dannyyassine on 2017-06-25.
 */

import swal from 'sweetalert2'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ModalAlert extends Component {
    render() {
        return(
            swal(
                'New job created!',
                '',
                'success'
            )
        )
    }
}