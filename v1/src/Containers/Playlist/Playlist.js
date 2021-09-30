import React from 'react';

import './Playlist.css';

import Tracklist from '../../Components/Tracklist/Tracklist';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import HeadingII from '../../Components/HeadingII/HeadingII';

class Playlist extends React.Component {
    constructor(props) {
        super(props);


        this.handleNameChange = this.handleNameChange.bind(this);
    }


    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <HeadingII text={'save playlist to Spotify'}/>
                <Input placeholder={this.props.playlistName} onChange={this.handleNameChange}/>
                <Button className="Playlist-save" onClick={this.props.onSave} text="save to spotify"/>
                <Tracklist tracks={this.props.playlist} action={this.props.onRemove} isRemoval={true} />
            </div>
        )
    }
}

export default Playlist;
