import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { Link } from "react-router-dom";

function Search() {
    const [query, setQuery] = useState("");

    const retrievingQuery = (searchTerms) => {
        let newQueryString = searchTerms.split(" ").join("+");
        console.log("newQueryString", newQueryString);
        setQuery(newQueryString);
    };

    if (query) {
        return (
            <div className="search-container">
                <div className="search-container-after">
                    <div className="nav-buttons">
                        <Link to="/">HOME</Link>
                        <Link to="/nominations">NOMINATIONS</Link>
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
                        <Link to="/">HOME</Link>
                        <Link to="/nominations">NOMINATIONS</Link>
                    </div>
                    <h1>SEARCH FOR MOVIES TO VOTE FOR HERE</h1>
                    <SearchBar retrievingQuery={retrievingQuery} />
                </div>
            </div>
        );
    }
}

export default Search;
