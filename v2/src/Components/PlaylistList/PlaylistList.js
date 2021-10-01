import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './PlaylistList.css';

import ListItem from '../ListItem/ListItem';
import Headings from '../Headings/Headings';

const PlaylistList = (props) => {

    const imageSrc = (image) => {
        return image.images.length > 0 ? image.images[0].url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ejY157hxzTRFg5J0Ipa-jZr8dZdrkO5dzA&usqp=CAU"
    }

    return (
        <div className="List">
            <Headings text='current playlists' />
            <ul>
                {
                    props.usersLists.map((item) => {
                        return <ListItem key={item.id} imgSrc={imageSrc(item)} name={item.name} owner={item.owner.display_name} trackTotal={item.tracks.total} />

                    })
                }
            </ul>
        </div>
    )
}

PlaylistList.propTypes = {
    usersLists: PropTypes.array.isRequired, 
}

export default PlaylistList;