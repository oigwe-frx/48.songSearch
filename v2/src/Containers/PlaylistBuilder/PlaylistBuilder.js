import React from 'react';

import './Playlist.css';

import Tracklist from '../Tracklist/Tracklist';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import Headings from '../../Components/Headings/Headings';

class PlaylistBuilder extends React.Component {
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
                {
                    this.props.playlist.length > 0 ? <> <Headings text='save playlist to Spotify' /> <Input style={{ height: '8%'}} placeholder={this.props.playlistName} onChange={this.handleNameChange} />
                        <Button style={{ height: '6.5%', marginLeft: '33%',  marginBottom:'2rem'  }} className="Playlist-save" onClick={this.props.onSave} text="save to spotify" />
                        <Tracklist tracks={this.props.playlist} action={this.props.onRemove} isRemoval={true} /></> : <></>
                }
            </div>
        )
    }
}

export default PlaylistBuilder;