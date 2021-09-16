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
        console.log("change")
        this.setState({term: event.target.value})
    }

    search() {
        console.log("Search")
        this.props.onSearch(this.state.term);
    }

    render() {
        return (
            <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
            <button className="SearchButton" type="submit" onClick={this.search}>SEARCH</button>
          </div> 
        )
    }
}

export default SearchBar;