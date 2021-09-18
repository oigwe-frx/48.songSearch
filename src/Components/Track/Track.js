import React from 'react';

import './Track.css';

class Track extends React.Component {
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

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.info.name}</h3>
                    <p><span className='Track-description'>artist: </span>{this.props.info.artists} | <span className='Track-description'>album: </span>{this.props.info.album}</p>
                </div>
                {
                    this.props.isRemoval === false ? <button className="Track-action" onClick={this.addTrack}>+</button> : <button className="Track-action" onClick={this.removeTrack}>-</button>
                }
            </div>
        )
    }
}

export default Track;
