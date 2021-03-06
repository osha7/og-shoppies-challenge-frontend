import React from 'react';
import { Link } from 'react-router-dom'

function Main(props) {
    
    return (
        <div className="main">
            <div className="main-section-1" >
                <h1>WELCOME TO THE SHOPPIES!</h1>
                <h3>Nominate Up To 5 Movies</h3>
            </div>
            <div className="main-section-2" >
                <Link to="/search" >MOVIE SEARCH</Link>
                <Link to="/nominations" >NOMINATIONS</Link>
            </div>
        </div>
    );
}

export default Main;