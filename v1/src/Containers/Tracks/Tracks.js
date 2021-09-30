import React from 'react';

import './Tracks.css';

import TrackItem from '../../Components/TrackItem/TrackItem';

class Tracks extends React.Component {
    constructor(props) {
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    addTrack(event) {
        return this.props.action(this.props.info);
    }

    removeTrack(event) {
        this.props.action(this.props.info);
    }

    addOrRemove(boolean) {
        return !boolean ? { method: this.addTrack, text: '+'} : {method: this.removeTrack, text: '-'}
    }

    render() {
        return (
            <TrackItem name={this.props.info.name} artists={this.props.info.artists} album={this.props.info.album} onClick={this.addOrRemove(this.props.isRemoval).method} text={this.addOrRemove(this.props.isRemoval).text}/>
        )
    }
}

export default Tracks;
