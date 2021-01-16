import React from 'react';

function Main(props) {
    
    return (
        <div className="main">
            <div className="main-section-1" >
                <h1>WELCOME TO THE SHOPPIES!</h1>
                <p>Nominate Up To 5 Movies</p>
            </div>
            <div className="main-section-2" >
                <a href="/search">MOVIE SEARCH</a>
                <a href="/nominations">NOMINATIONS</a>
            </div>
        </div>
    );
}

export default Main;