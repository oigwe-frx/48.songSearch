import React from 'react';
import PropTypes from 'prop-types';

import './Headings.css'

const Headings = (props) => {
        return <h2> {props.text}</h2>
}

Headings.propTypes = {
        text: PropTypes.string.isRequired,
}

export default Headings;