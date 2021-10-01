import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

import './SearchBar.css';


const SearchBar = (props) => {
    const [term, setTerm] = useState('');


    const handleTermChange = (event) => {
        setTerm(event.target.value);
    }

    const handleSearch = () => {
        props.onSearch(term);
        setTerm('');
    }


    return (
        <div className="SearchBar">
            <Input placeholder="search by song, album or artist" type="text" onChange={handleTermChange} value={term} />
            <Button className="SearchButton" onClick={handleSearch} type='submit' text='search' />
        </div>
    )
}

export default SearchBar;