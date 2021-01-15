import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults'

function Search() {
    const [query, setQuery] = useState('')

    const retrievingQuery = (searchTerms) => {
        console.log(searchTerms)
        let newQueryString = searchTerms.split(" ").join('')
        setQuery(newQueryString)

    }

    if (query) {
        return (
            <div>
                <h1>SEARCH FOR MOVIES TO VOTE FOR HERE</h1>
                <SearchBar retrievingQuery={retrievingQuery} />
                <SearchResults query={query} />
            </div>
        );
    } else {
        return (
            <div>
                <h1>SEARCH FOR MOVIES TO VOTE FOR HERE</h1>
                <SearchBar retrievingQuery={retrievingQuery} />
            </div>
        )
    }
}

export default Search;