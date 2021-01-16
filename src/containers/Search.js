import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults'

function Search() {
    const [query, setQuery] = useState('')

    const retrievingQuery = (searchTerms) => {
        // console.log(searchTerms)
        let newQueryString = searchTerms.split(" ").join('')
        setQuery(newQueryString)

    }

    if (query) {
        return (
            <div className="search-container">
                <div className="search-container-after">
                <div className="nav-buttons">
                    <a href="/">HOME</a>
                    <a href="/nominations">NOMINATIONS</a>
                </div>
                    <h1>SEARCH RESULTS</h1>
                    <SearchBar retrievingQuery={retrievingQuery} />
                    <SearchResults query={query} />
                </div>
            </div>
        );
    } else {
        return (
            <div className="search-container">
                
                <div className="search-container-before">
                <div className="nav-buttons">
                    <a href="/">HOME</a>
                    <a href="/nominations">NOMINATIONS</a>
                </div>
                    <h1>SEARCH FOR MOVIES TO VOTE FOR HERE</h1>
                    <SearchBar retrievingQuery={retrievingQuery} />
                </div>
            </div>
        )
    }
}

export default Search;