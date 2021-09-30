import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';

import './App.css';

//import SearchBar from '../SearchBar/INSearchBar';
import SearchResults from '../../Components/SearchResults/SearchResults';
import PlaylistBuilder from '../PlaylistBuilder/PlaylistBuilder';
import PlaylistList from '../../Components/PlaylistList/PlaylistList';


//Header
import Logo from '../../Components/Logo/Logo';
import SearchBar from '../SearchBar/SearchBar';

//Util
import Spotify from '../../util/Spotify';


function App() {


  const [accessToken, setAccessToken] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('playlist name');
  const [playlistTracks, setPlaylistTracks] = useState([]); //newly created playlist
  const [usersLists, setUsersLists] = useState([]); //playlist retrieved from Spotify Account
  const [userInfo, setUserInfo] = useState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const dataFetch = setTimeout(() => {
      Spotify.getUserInfo()
        .then((user) => {
          setUserInfo(user);
          setMounted(!mounted);
          return user.id
        })
        .then((id) => {
          Spotify.getUserPlaylists(id)
            .then((playListsAll) => {
              setUsersLists(playListsAll.items);
            })
        })
    }, 3000);

    return (() => { clearTimeout(dataFetch) });
  }, []);


  //ACTIONS

  //Add track to playlist that will be created
  const addTrack = (track) => {
    let addedTrack = [...playlistTracks];
    if (addedTrack.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    addedTrack.push(track);
    setPlaylistTracks(addedTrack);
  }

  useEffect(() => {
  }, [playlistTracks])



  //Remove track from playlist that will be created
  const removeTrack = (track) => {
    const updatedList = playlistTracks.filter((song) => {
      return song.id !== track.id;
    });
    setPlaylistTracks(updatedList);
  }


  //Used to name the playlist that will be created
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  }


  //Save the new playlist to the user's Spotify account
  const savePlaylist = () => {
    const trackURI = [];

    playlistTracks.forEach((track) => {
      trackURI.push(track.uri);
    })

    Spotify.savePlaylist(playlistName, trackURI, userInfo.id)
    .then(() => {
      Spotify.getUserPlaylists(userInfo.id)
      .then((playListsAll) => {
        setUsersLists(playListsAll.items);
        setPlaylistName('playlist name');
        setPlaylistTracks([]);
        setSearchResults([]);
      })
    })
   
  }

  useEffect(() => {
  }, [usersLists])

  //Search for tracks
  const handleSearch = async (searchTerm) => {
    await Spotify.search(searchTerm)
      .then((results) => {
        setSearchResults(results);
      })
  }


  return (
    <>
      {
        mounted === false ?
          <Spinner animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner> :
          <>
            <Container fluid className="App">
              <Row style={{ height: '20%' }}>
                <Col xs='3'>
                  <Logo />
                </Col>
                <Col xs={{ size: 8, offset: 1 }}>
                  <SearchBar onSearch={handleSearch} />
                </Col>
              </Row>
              <Row style={{ height: '65%' }}>
                <Col className="App-list">
                  <PlaylistList usersLists={usersLists} />
                </Col>
                <Col className="App-list">
                  <SearchResults searchResults={searchResults} onAdd={addTrack} />
                </Col>
                <Col className="App-list">
                  <PlaylistBuilder playlistName={playlistName} playlist={playlistTracks} onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist} />
                </Col>
              </Row>
              <Row style={{ height: '15%' }}>Yolo</Row>
            </Container>
          </>
      }

    </>
  );
}
// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       accessToken: '',
//       searchResults: [],
//       playlistName: 'playlist name',
//       playlistTracks: [], //Newly created playlist
//       userLists: [] //Playlist retrieved from Spotify account
//     }

//     this.addTrack = this.addTrack.bind(this);
//     this.removeTrack = this.removeTrack.bind(this);
//     this.updatePlaylistName = this.updatePlaylistName.bind(this);
//     this.savePlaylist = this.savePlaylist.bind(this);
//     this.search = this.search.bind(this);
//     this.listPlaylists = this.listPlaylists.bind(this);
//   }


//   //Add track to playlist that will be created
//   addTrack(track) {
//     let addedTracks = this.state.playlistTracks;

//     if (addedTracks.find(savedTrack => savedTrack.id === track.id)) {
//       return;
//     }
//     addedTracks.push(track);
//     this.setState({ playlistTracks: addedTracks });
//   }

//   //Remove track from playlist that will be created
//   removeTrack(track) {
//     const { playlistTracks } = this.state;
//     const updatedList = playlistTracks.filter((song) => {
//       return song.id !== track.id;
//     });
//     this.setState({ playlistTracks: updatedList });
//   }


//   //Used to name the playlist that will be created
//   updatePlaylistName(name) {
//     this.setState({ playlistName: name });
//   }


//   //Save the new playlist to the user's Spotify account
//   savePlaylist() {
//     const trackURI = [];
//     const { playlistTracks } = this.state;

//     playlistTracks.forEach((track) => {
//       trackURI.push(track.uri);
//     })

//     Spotify.savePlaylist(this.state.playlistName, trackURI)
//     //const updatedPlaylist = Spotify.getUserPlaylists()
//     this.setState({
//       playlistName: 'playlist name',
//       playlistTracks: [],
//       //userLists: updatedPlaylist,
//     });
//   }


//   //Retrieve already created playlist names from user's Spotify account
//   async listPlaylists() {
//     const playListAll = await Spotify.getUserPlaylists();
//     this.setState({ userLists: playListAll.items });
//   }

//   //Search for tracks
//   async search(searchTerm) {
//     const results = await Spotify.search(searchTerm);
//     this.setState({ searchResults: results });
//   }

//   render() {
//     return (
//       <div className='App-container'>
//         <h1>song<span className="highlight">Search</span></h1>
//         <div className="App">
//           <div className="App-list App-playlistAll">
//             <List userLists={this.listPlaylists} />
//           </div>
//           <div className="App-list">
//             <SearchBar onSearch={this.search} />
//             <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
//           </div>
//           <div className="App-list">
//             <Playlist playlistName={this.state.playlistName} playlist={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
export default App;
