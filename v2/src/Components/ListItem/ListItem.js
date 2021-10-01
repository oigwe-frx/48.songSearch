import React from 'react';
import PropTypes from 'prop-types';

import '../PlaylistList/PlaylistList.css';

const ListItem = (props) => {

    return (
        <li key={props.key}>
            <div className="List-icon">
                <img src={props.imgSrc}
                    alt={`Playlist ${props.name}`} />
            </div>
            <div className="List-information">
                <h3 className="List-name">{props.name.toLowerCase()}</h3>
                <p><span className='List-description'>createdBy:</span> {props.owner}</p>
                <p><span className='List-description'>tracks:</span> {props.trackTotal}</p>
            </div>
        </li>
    )
}

ListItem.propTypes = {
    key: PropTypes.string,
    imgSrc: PropTypes.string,
    name: PropTypes.string,
    owner: PropTypes.string,
    trackTotal: PropTypes.number,
}

export default ListItem;