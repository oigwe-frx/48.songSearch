import React from 'react';

import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: '',
      searchResults: [
      //   {id:'A', name: "A name", artist: "A artist", album: 'A album'}, 
      //   {id:'B', name: "B name", artist: "B artist", album: 'B album'}
      ],
      playlistName: 'Enter Playlist Name', 
      playlistTracks: [
      //   {id:'C', name: "C name", artist: "A artist", album: 'A album', uri: '123'}, 
      //   {id:'D', name: "D name", artist: "B artist", album: 'B album', uri: '123'}
      ],
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  async componentDidMount() {
    const token = await Spotify.getAccessToken();    
    this.setState({accessToken: token});
    console.log("Tai", this.state.accessToken)
}

  addTrack(track){
    let addedTracks = this.state.playlistTracks;

    if(addedTracks.find(savedTrack => savedTrack.id === track.id)) {
     return;
    }
    addedTracks.push(track);
    this.setState({playlistTracks: addedTracks});
  }
   
  removeTrack(track) {
    const {playlistTracks} = this.state;
    const updatedList = playlistTracks.filter((song)=> {
      return song.id !== track.id;
    });
    this.setState({playlistTracks: updatedList});
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist(){
    const trackURI = [];
    const {playlistTracks} = this.state;

    playlistTracks.forEach((track) => {
      trackURI.push(track.uri);
    })
    console.log("Beep", trackURI)

    Spotify.savePlaylist(this.state.playlistName, trackURI)
    .then((tooltip) => {
      this.setState({
        playlistName: 'Enter Playlist Name', 
        playlistTracks: []
      });
      console.log("Tools", this.state)
    })
  }

  async search(searchTerm) {
    const results = await Spotify.search(searchTerm);
    console.log(results)
    this.setState({searchResults: results}) ;
    console.log("Boom", this.state)
  }

  render() {
    return (
      <div>
        <h1>song<span className="highlight">Search</span></h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlist={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
