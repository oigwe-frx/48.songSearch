//accessToken variable will hold the user's access token
let accessToken;
const clientId = '2141e03cafa2420aa68567fdff1d7a7f';
const redirectUri = 'http://localhost:3000/';


const Spotify = {

    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        //Checking to see if Access Token Matches
        const redirecedtURL = window.location.href;
        const accessTokenMatch = redirecedtURL.match(/access_token=([^&]*)/);
        const expiresInMatch = redirecedtURL.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch)[1];

            //Clearing Parameters fron url inorder to prevent the app using the token after permission has expired. The app will grab a new access token when the old expires.
            // window.setTimeout(() => accessToken = '', expiresIn * 10000);
            // window.history.pushState('Access Token', null, '/');

            return accessToken;
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessURL;
        }
    },


    search(searchTerm) {
        accessToken = this.getAccessToken();
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`
        return fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    const jsonResponse = response.json();
                    return jsonResponse;
                }
            })
            .then((jsonResponse) => {
                console.log("Jig",jsonResponse)
                if(!jsonResponse.tracks){
                    return [];
                } else {
                    return jsonResponse.tracks.items.map((track) => {
                       return {
                            id: track.id, 
                            name: track.name,
                            artists: track.artists[0].name,
                            album: track.album.name,
                            uri: track.uri
                        }
                    })
                }
            })
    }, 

    savePlaylist(playlistName, trackURI) {
        if(playlistName && trackURI.length > 0) {
            const accessToken = this.getAccessToken();
            const headers = {
                Authorization: `Bearer ${accessToken}`
            }            
            let userID;

            return fetch('https://api.spotify.com/v1/me', {headers: headers})
            .then((response) => { return response.json() })
            .then((jsonResponse) => {
                userID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                    headers: headers,
                    method: 'POST', 
                    body: JSON.stringify({name: playlistName})
                })
                .then((response) => { return response.json()})
                .then((jsonResponse) => {
                    const playlistID = jsonResponse.id;
                    return playlistID;
                })
                .then((playlistID) => {
                    const endpoint = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`
                    return "Grub", fetch(endpoint, {
                        headers: headers,
                        method: 'POST', 
                        'Content-Type':'application/json', 
                        body: JSON.stringify({"uris": trackURI})
                    }) 
                })

            })
        } else { return }
    },
}

export default Spotify;