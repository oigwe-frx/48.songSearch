import React from 'react';

import './SearchResults.css';

import Tracklist from '../Tracklist/Tracklist';

class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
            {
                this.props.searchResults.length > 0 ? <> <h2>Results</h2>
                <Tracklist tracks={this.props.searchResults} action={this.props.onAdd} isRemoval={false}/></> : <></>
            }
                
            </div>
        )
    }
}

export default SearchResults;