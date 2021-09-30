import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'reactstrap';

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


  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('playlist name');
  const [playlistTracks, setPlaylistTracks] = useState([]); //newly created playlist
  const [usersLists, setUsersLists] = useState([]); //playlist retrieved from Spotify Account
  const [userInfo, setUserInfo] = useState();
  const [mounted, setMounted] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
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
    setAlert({color: 'alert-success', text: `${track.name} was added to the playlist`});
    setTimeout(() => {
      setAlert(null)
    }, 1000)
  }


  //Remove track from playlist that will be created
  const removeTrack = (track) => {
    const updatedList = playlistTracks.filter((song) => {
      return song.id !== track.id;
    });
    setPlaylistTracks(updatedList);
    setAlert({color: 'alert-danger', text: `${track.name} was removed from the playlist`});
    setTimeout(() => {
      setAlert(null)
    }, 1000)
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
        setAlert({color: 'alert-info', text: `${playlistName} was added to your Spotify account`});
    setTimeout(() => {
      setAlert(null)
    }, 3000);
    setPlaylistName('playlist name');
    setPlaylistTracks([]);
    setSearchResults([]);
      })
    })
   
  }

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
          <Spinner animation="grow" role="status" style={{color: '#fff', margin: '5rem', fontSize: '3rem', padding: '5rem'}}>
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
              <Row style={{ height: '15%' }}>
                {
                   alert ? <Alert className={`${alert.color} Alert`}>{alert.text}</Alert> : <></>
                }
              </Row>
            </Container>
          </>
      }

    </>
  );
}

export default App;
