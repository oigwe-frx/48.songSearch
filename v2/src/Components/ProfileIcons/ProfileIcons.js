import React from 'react';
import PropTypes from 'prop-types';

import './ProfileIcons.css'

const ProfileIcons = (props) => {
    return (
        <div className="Profile">
            <span className="material-icons" style={{marginTop: '0.5rem', fontSize:'20px'}}>settings</span>
            <span className="material-icons" style={{marginTop: '0.5rem', fontSize: '20px'}}>notifications</span>
            <img className="Profile-img" src={props.img} alt="profile photo"/>
            <p className="Profile-name">{props.name}</p>
        </div>
    );
}

ProfileIcons.propTypes = {
    src: PropTypes.string, 
    name: PropTypes.string, 
}

export default ProfileIcons;