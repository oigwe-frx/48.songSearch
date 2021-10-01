import React from 'react';
import PropTypes from 'prop-types';
 
import './Tracks.css';

import TrackItem from '../TrackItem/TrackItem';

const Tracks = (props) => {
    return (
        <TrackItem key={props.info.id} image={props.info.image} info={props.info} name={props.info.name} artists={props.info.artists} album={props.info.album} onClick={props.action} text={props.text} />
    )
}

Tracks.propTypes = {
    info: PropTypes.object.isRequired, 
}


export default Tracks;