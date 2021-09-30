import React from 'react';

import '../PlaylistList/PlaylistList.css';

class ListItem extends React.Component {

    render() {
        return (
            <li key={this.props.key}>
                <div className="List-icon">
                    <img src={this.props.imgSrc}
                        alt={`Playlist ${this.props.name}`} />
                </div>
                <div className="List-information">
                    <h3 className="List-name">{this.props.name.toLowerCase()}</h3>
                    <p><span className='List-description'>createdBy:</span> {this.props.owner}</p>
                    <p><span className='List-description'>tracks:</span> {this.props.trackTotal}</p>
                </div>
            </li>
        )
    }
}

export default ListItem;