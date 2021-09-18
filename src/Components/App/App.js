import React from 'react';

import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import List from '../List/List';

import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: '',
      searchResults: [],
      playlistName: 'enter playlist name',
      playlistTracks: [], //Newly created playlist
      userLists: [] //Playlist retrieved from Spotify account
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.listPlaylists = this.listPlaylists.bind(this);
  }


//Add track to playlist that will be created
  addTrack(track) {
    let addedTracks = this.state.playlistTracks;

    if (addedTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    addedTracks.push(track);
    this.setState({ playlistTracks: addedTracks });
  }

//Remove track from playlist that will be created
  removeTrack(track) {
    const { playlistTracks } = this.state;
    const updatedList = playlistTracks.filter((song) => {
      return song.id !== track.id;
    });
    this.setState({ playlistTracks: updatedList });
  }


//Used to name the playlist that will be created
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }


//Save the new playlist to the user's Spotify account
  savePlaylist() {
    const trackURI = [];
    const { playlistTracks } = this.state;

    playlistTracks.forEach((track) => {
      trackURI.push(track.uri);
    })

    Spotify.savePlaylist(this.state.playlistName, trackURI)
    const updatedPlaylist = Spotify.getUserPlaylists()
    this.setState({
      playlistName: 'playlist name',
      playlistTracks: [],
      userLists: updatedPlaylist,
    });
  }


//Retrieve already created playlist names from user's Spotify account
  async listPlaylists() {
    const playListAll = await Spotify.getUserPlaylists();
    this.setState({ userLists: playListAll.items });
  }

//Search for tracks
  async search(searchTerm) {
    const results = await Spotify.search(searchTerm);
    this.setState({ searchResults: results });
  }

  render() {
    return (
      <div className='App-container'>
        <h1>song<span className="highlight">Search</span></h1>
        <div className="App">
          <div className="App-playListAll">
            <List userLists={this.listPlaylists} />
          </div>
          <div className="App-search">
            <SearchBar onSearch={this.search} />
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
          </div>
          <div className="App-playlist">
            <Playlist playlistName={this.state.playlistName} playlist={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
