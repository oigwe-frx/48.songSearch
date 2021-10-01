import React from "react";
import PropTypes from 'prop-types';

import './Input.css';

const Input = (props) => {
    return <input className="Input" type="text" placeholder={props.placeholder} onChange={props.onChange} style={props.style} value={props.value} />
}

Input.propTypes = {
    placeholder: PropTypes.string.isRequired, 
    onChange: PropTypes.func.isRequired, 
    style: PropTypes.object,
    value: PropTypes.string,
}

export default Input;