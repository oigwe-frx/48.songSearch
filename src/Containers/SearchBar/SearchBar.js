import React from 'react';

import './SearchBar.css'

import Button from '../../Components/Button/Button';
import Input from '../../Components/Input/Input';
import HeadingII from '../../Components/HeadingII/HeadingII';

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
        this.setState({ term: event.target.value })
    }

    search() {
        console.log("Search")
        this.props.onSearch(this.state.term);
    }

    headingText() {
        return []
    }
    render() {
        return (
            <div className="SearchBar">
                <HeadingII text={'search song, add to playlist'}/>
                <Input placeholder="song, album or artist" onChange={this.handleTermChange}/>
                <Button className="SearchButton" type="submit" onClick={this.search} text="search"/>
            </div>
        )
    }
}

export default SearchBar;