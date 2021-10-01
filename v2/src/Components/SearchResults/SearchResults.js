import React from 'react';
import PropTypes from 'prop-types';

import './SearchResults.css';

import Tracklist from '../../Containers/Tracklist/Tracklist';
import Headings from '../Headings/Headings';

const SearchResults = (props) => {
    return (
        <div className="SearchResults">
            {
                props.searchResults.length > 0 ? <> <Headings text='results' />
                    <Tracklist tracks={props.searchResults} action={props.onAdd} isRemoval={false} /></> : <></>
            }

        </div>
    )
}

SearchResults.propTypes = {
    searchResults: PropTypes.array.isRequired, 
    onAdd: PropTypes.func.isRequired, 
}

export default SearchResults;