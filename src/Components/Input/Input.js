import React from "react";

import '../../Containers/Playlist/Playlist.css';

class Input extends React.Component {
    render() {
        return <input placeholder={this.props.placeholder} onChange={this.props.onChange} />
    }
}

export default Input;