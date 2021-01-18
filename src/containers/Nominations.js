import React from 'react';
import MovieNominations from '../components/MovieNominations';
import { Link } from 'react-router-dom';


function Nominations() {

    return (
        <div className="search-container">
            <div className="search-container-after">
                <div className="nav-buttons">
                    <Link to="/">HOME</Link>
                    <Link to="/search">SEARCH</Link>
                </div>
                <h1>YOUR MOVIE NOMINATIONS</h1>
                <MovieNominations />
            </div>
        </div>
    );
}

export default Nominations;