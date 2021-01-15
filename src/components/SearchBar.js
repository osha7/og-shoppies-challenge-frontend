import React, { useState } from 'react';

function SearchBar(props) {

    const [searchTerms, setSearchTerms] = useState('')

    const handleOnChange = (e) => {
        setSearchTerms(e.target.value)
    }

    const movieFilterOnChange = (e) => {
        e.preventDefault()
        props.retrievingQuery(searchTerms)
        setSearchTerms('')
    }

    return (
        <div className="search-bar">
            <form onSubmit={movieFilterOnChange}>
                <input className="search-input" name="searchTerm" type="search" value={searchTerms} onChange={handleOnChange} placeholder="Search For Movies..."/>
                <button className="search-btn" onClick={movieFilterOnChange}>
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </form>
        </div>
    );
}

export default SearchBar;