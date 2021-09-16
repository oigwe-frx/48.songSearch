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
                <input placeholder={this.props.playlistName} onChange={this.handleNameChange} />
                <Tracklist tracks={this.props.playlist} action={this.props.onRemove} isRemoval={true}/>
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;