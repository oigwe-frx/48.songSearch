import React from 'react';
import PropTypes from 'prop-types';


import './PlaylistBuilder.css';

import Tracklist from '../Tracklist/Tracklist';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import Headings from '../../Components/Headings/Headings';

const PlaylistBuilder = (props) => {

    const handleNameChange = (event) => {
        props.onNameChange(event.target.value);
    }

    return (
        <div className="Playlist">
            {
                props.playlist.length > 0 ? <> <Headings text='save playlist to Spotify' /> <Input style={{ height: '8%' }} placeholder={props.playlistName} onChange={handleNameChange} value={props.value} />
                    <Button style={{ height: '6.5%', marginLeft: '33%', marginBottom: '2rem' }} className="Playlist-save" onClick={props.onSave} text="save to spotify" />
                    <Tracklist tracks={props.playlist} action={props.onRemove} isRemoval={true} /></> : <></>
            }
        </div>
    )
}

PlaylistBuilder.propTypes = {
    playlist: PropTypes.array.isRequired, 
    playlistName: PropTypes.string, 
    onSave: PropTypes.func.isRequired,
    value: PropTypes.string,
    onRemove: PropTypes.func.isRequired,
}
export default PlaylistBuilder;