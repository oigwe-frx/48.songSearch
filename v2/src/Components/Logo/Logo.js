import React from 'react';

import './Logo.css';

const Logo = (props) => {
    return (
        <div className="Logo">
            <span className="material-icons highlight" style={{marginTop: 18, marginRight: 5}}>leaderboard</span>
            <h1 style={{margin: 0}}>
                songs2
                <span className="highlight">Search</span>
            </h1>
        </div>
    );
}

export default Logo;