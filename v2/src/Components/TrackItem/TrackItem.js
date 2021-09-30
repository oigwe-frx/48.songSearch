import React from 'react';

import '../Tracks/Tracks.css';


class TrackItem extends React.Component {
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.name}</h3>
                    <p><span className='Track-description'>artist: </span>{this.props.artists} | <span className='Track-description'>album: </span>{this.props.album}</p>
                </div>
                <button className="Track-action" onClick={() => {this.props.onClick(this.props.info)}}>{this.props.text}</button>
            </div>
        )
    }
}

export default TrackItem;