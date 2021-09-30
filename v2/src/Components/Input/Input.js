import React from "react";

import './Input.css';

class Input extends React.Component {
    render() {
        return <input className="Input" placeholder={this.props.placeholder} onChange={this.props.onChange} style={this.props.style}/>
    }
}

export default Input;