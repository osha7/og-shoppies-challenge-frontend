import React, { useState, useEffect } from "react";
import { API_URL } from "../ConstantURLs";

function SearchResults(props) {
    // trying to get more than limit=10, but doesn't work: let searchQuery = (props.query + ', page=1')
    let searchQuery = props.query;

    const [movieResults, setMovieResults] = useState([]);
    // const [nominatedMovies, setNominatedMovies] = useState([])
    // const nominatedMovies = []
    const [savedNominations, setSavedNominations] = useState([]);

    useEffect(() => {
        const fetchMovieSearchResults = async () => {
            const OMDB_API = `http://www.omdbapi.com/?apikey=700a3803&s=${searchQuery}`;
            const response = await fetch(OMDB_API);
            const fetchData = await response.json();
            // console.log(fetchData.Search);
            setMovieResults(fetchData.Search);
            // the response from OMDB_API default only serves the limit=10 movies in the fetch
            // an OMDB npm plugin (npm i omdb) exists where you can use set params on an omdb function: omdb.search('true', page=1) ((or: omdb.search_movie('true', page=2))) // each page serves 100 movies per page
        };
        const fetchNominatedMovies = async () => {
            const response = await fetch(API_URL + "/nominated_movies");
            const fetchData = await response.json();
            console.log(fetchData);
            // setSavedNominations(fetchData);
        };

        fetchMovieSearchResults();
        fetchNominatedMovies();
    }, [searchQuery]);

    const handleOnClick = (movie) => {
        if (savedNominations.length < 5) {
            console.log("less than 5", movie);
            const postMovieNominations = async () => {
                const settings = {
                    method: "POST",
                    body: JSON.stringify(movie),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                };
                const response = await fetch(
                    API_URL + "/create-or-ignore-movie",
                    settings
                );
                if (!response.ok) throw Error(response.message);
                const data = await response.json();
                // return data
                console.log("data from POST", data);
                // try {

                //     // if (response.ok) {
                //     //     return response
                //     // } else {
                //     //     const message = `An error has occured: ${response.status}`;
                //     //     throw new Error(message);
                //     // }
                //     // setSavedNominations(data)
                // }
            };
            postMovieNominations();
            // console.log(data);
            // nominatedMovies.push(movie)
            // console.log("array", nominatedMovies)
        } else if (savedNominations.length >= 5) {
            alert(
                "Only 5 nominations allowed. You can delete a previous nomination to choose this movie instead."
            );
        }
    };

    const results1 = movieResults.map((movie) => {
        // console.log(movie);
        return (
            <div className="ind-movie-div" key={movie.imdbID}>
                <img src={movie.Poster} alt={movie.Title} />
                <h3>{movie.Title}</h3>
                <p>Release Year: {movie.Year}</p>

                <button onClick={() => handleOnClick(movie)}>
                    &#10003; Nominate
                </button>
            </div>
        );
    });

    return (
        <div className="search-results">
            {/* {console.log(movieResults)} */}
            <div className="search-results-cards">{results1}</div>
        </div>
    );
}

export default SearchResults;
