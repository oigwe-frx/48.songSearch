import React from 'react';

import './Tracklist.css';

import Tracks from '../../Components/Tracks/Tracks';

class Tracklist extends React.Component {

    constructor(props) {
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    addTrack(info) {
        return this.props.action(info);
    }

    removeTrack(info) {
        return this.props.action(info);
    }

    addOrRemove(boolean) {
        return !boolean ? { method: this.addTrack, text: '+'} : {method: this.removeTrack, text: '-'}
    }


    render() {
        return (
            <div className="TrackList">
                {
                    this.props.tracks.map((track) => {

                        return <Tracks key={track.id} info={track} action={this.addOrRemove(this.props.isRemoval).method} text={this.addOrRemove(this.props.isRemoval).text}/>
                    })
                } 
            </div>
        )
    }
}

export default Tracklist;