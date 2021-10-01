import React from 'react';
import PropTypes from 'prop-types';

import '../Tracks/Tracks.css';
import './TrackItem.css'


const TrackItem = (props) => {
    return (
        <div className="Track">
            <div className="Track-icon">
                <img src={props.image}
                    alt={props.name} />
            </div>
            <div className="Track-information">
                <h3>{props.name}</h3>
                <p><span className='Track-description'>artist: </span>{props.artists} | <span className='Track-description'>album: </span>{props.album}</p>
            </div>
            <button className="Track-action" onClick={() => { props.onClick(props.info) }}>{props.text}</button>
        </div>
    )
}

TrackItem.propTypes = {
    name: PropTypes.string, 
    artists: PropTypes.string, 
    album: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
}

export default TrackItem;