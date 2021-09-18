import React from 'react';

import './Playlist.css';

import Tracklist from '../Tracklist/Tracklist';


class Playlist extends React.Component {
    constructor(props) {
        super(props);


        this.handleNameChange = this.handleNameChange.bind(this);
    }


    handleNameChange(event) {
        console.log("Boop")
        this.props.onNameChange(event.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <h2>save new playlist to Spotify</h2>
                <input placeholder={this.props.playlistName} onChange={this.handleNameChange} />
                <button className="Playlist-save" onClick={this.props.onSave}>save to spotify</button>
                <Tracklist tracks={this.props.playlist} action={this.props.onRemove} isRemoval={true} />
            </div>
        )
    }
}

export default Playlist;
