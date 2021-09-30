import React from 'react';

import './SearchResults.css';

import Tracklist from '../../Containers/Tracklist/Tracklist';
import Headings from '../Headings/Headings';

class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
            {
                this.props.searchResults.length > 0 ? <> <Headings text='results'/>
                <Tracklist tracks={this.props.searchResults} action={this.props.onAdd} isRemoval={false}/></> : <></>
            }
                
            </div>
        )
    }
}

export default SearchResults;