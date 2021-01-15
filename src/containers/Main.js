import React from 'react';

function Main(props) {
    return (
        <div className="main">
            <h1>WELCOME TO THE SHOPPIES!</h1>
            <p>Where YOU Get To Choose Up To 5 Movies To Nominate</p>
            <div>
                <a href="/nominations">NOMINATIONS</a>
            </div>
            <div>
                <a href="/search">MOVIE SEARCH</a>
            </div>

        </div>
    );
}

export default Main;