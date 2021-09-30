import React from 'react';

class Button extends React.Component {
    render() {
        return (
            <button className={this.props.className} onClick={this.props.onClick} type={this.props.type}>{this.props.text}</button>
        )
    }
}

export default Button;
