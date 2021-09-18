import React from 'react';

import './SearchBar.css'

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
        }
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    handleTermChange(event) {
        this.setState({ term: event.target.value })
    }

    search() {
        this.props.onSearch(this.state.term);
    }

    render() {
        return (
            <div className="SearchBar">
                <h2>search song and <span className="highlight">+</span> to new playlist</h2>
                <input placeholder="song, album, or artist" onChange={this.handleTermChange} />
                <button className="SearchButton" type="submit" onClick={this.search}>search</button>
            </div>
        )
    }
}

export default SearchBar;
