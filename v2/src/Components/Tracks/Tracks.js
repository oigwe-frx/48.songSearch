import React from 'react';

import './Tracks.css';

import TrackItem from '../TrackItem/TrackItem';

class Tracks extends React.Component {
    
    render() {
        return (
            <TrackItem key={this.props.info.id} info={this.props.info} name={this.props.info.name} artists={this.props.info.artists} album={this.props.info.album} onClick={this.props.action} text={this.props.text}/>
        )
    }
}

export default Tracks;