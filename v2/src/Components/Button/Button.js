import React from 'react';

import './Button.css';

class Button extends React.Component {
    render() {
        return (
            <button className="Button" onClick={this.props.onClick} type={this.props.type} style={this.props.style}>{this.props.text}</button>
        )
    }
}

export default Button;