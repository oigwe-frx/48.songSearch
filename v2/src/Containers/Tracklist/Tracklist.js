import React from 'react';
import PropTypes from 'prop-types';

import './Tracklist.css';

import Tracks from '../../Components/Tracks/Tracks';

const Tracklist = (props) => {

    const addTrack = (info) => {
        return props.action(info);
    }

    const removeTrack = (info) => {
        return props.action(info);
    }

    const addOrRemove = (boolean) => {
        return !boolean ? { method: addTrack, text: '+' } : { method: removeTrack, text: '-' }
    }


    return (
        <div className="TrackList">
            {
                props.tracks.map((track) => {

                    return <Tracks key={track.id} info={track} action={addOrRemove(props.isRemoval).method} text={addOrRemove(props.isRemoval).text} />
                })
            }
        </div>
    )
}

Tracklist.propTypes = {
    tracks: PropTypes.array, 
    isRemoval: PropTypes.bool.isRequired, 
}

export default Tracklist;