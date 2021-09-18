import React from 'react';

import './List.css';

import Spotify from '../../util/Spotify';

class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userLists: [],
        }
    }

    async componentDidMount() {
        const playListAll = await Spotify.getUserPlaylists();
        this.setState({ userLists: playListAll.items });
    }


    render() {
        return (
            <div className="List">
                <h2>current <span className="highlight">playlists</span></h2>
                <ul>
                    {
                        this.state.userLists.map((item, i) => {
                            return <li key={item.id}>
                                <div className="List-icon">
                                    <img src={
                                        item.images.length > 0 ? item.images[0].url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ejY157hxzTRFg5J0Ipa-jZr8dZdrkO5dzA&usqp=CAU"
                                    }
                                        alt={`Playlist ${item.name}`} />
                                </div>
                                <div className="List-information">
                                    <h3 className="List-name">{item.name.toLowerCase()}</h3>
                                    <p><span className='List-description'>createdBy:</span> {item.owner.display_name}</p>
                                    <p><span className='List-description'>tracks:</span> {item.tracks.total}</p>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default List;
