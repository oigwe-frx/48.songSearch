import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = (props) => {
    return (
        <button className="Button" onClick={props.onClick} type={props.type} style={props.style}>{props.text}</button>
    )
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired, 
    type: PropTypes.string, 
    style: PropTypes.object,
    text: PropTypes.string.isRequired,
}

export default Button;