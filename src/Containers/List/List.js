import React from 'react';

import './List.css';

import Spotify from '../../util/Spotify';

import ListItem from '../../Components/ListItem/ListItem';
import HeadingII from '../../Components/HeadingII/HeadingII';

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

    imageSrc(image) {
        return image.images.length > 0 ? image.images[0].url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ejY157hxzTRFg5J0Ipa-jZr8dZdrkO5dzA&usqp=CAU"
    }


    render() {
        return (
            <div className="List">
                <HeadingII text='current playlists'/>
                <ul>
                    {
                        this.state.userLists.map((item) => {
                            return <ListItem key={item.id} imgSrc={this.imageSrc(item)} name={item.name} owner={item.owner.display_name} trackTotal={item.tracks.total}/>
                            
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default List;