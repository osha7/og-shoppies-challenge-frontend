import React, { useState, useEffect } from "react";
import { API_URL } from "../ConstantURLs";

function SearchResults(props) {
    // trying to get more than limit=10, but doesn't work: let searchQuery = (props.query + ', page=1')
    let searchQuery = props.query;

    const [movieResults, setMovieResults] = useState([]);
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

        fetchMovieSearchResults();
        fetchNominatedMovies()
        
    }, [searchQuery]);

    const fetchNominatedMovies = async () => {
        const response = await fetch(API_URL + "/nominated_movies");
        const fetchData = await response.json();
        const funneledData = fetchData.nominated_movies
        setSavedNominations(funneledData);
        console.log("fetchNominatedMovies", savedNominations)
    };

    const handleOnClick = (movie) => {
        // console.log("savedNominations", savedNominations)
        // fetchNominatedMovies();
        console.log("savedNominations", savedNominations)
        handleNomination(movie)
    };

    const handleNomination = async (movie) => {
        // const result = await fetchNominatedMovies()
        console.log("handleNomination", savedNominations)
        // debugger
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
                console.log("afterData", savedNominations)
// ---------------------------------------------------------------------
                setSavedNominations(prevState => {
                    console.log("prevstate", prevState)
                    debugger
                    return [...prevState, data]
                })
// ---------------------------------------------------------------------
                console.log("after trying to change state", savedNominations)
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
        } else {
            console.log("NO MORE THAN 5", movie);
            console.log("result", savedNominations)
            alert(
                "Only 5 nominations allowed. On the Nominations page you can delete a previous nomination to choose this movie instead."
            );
        }
    }

    const mappedMovieResults = movieResults.map((movie) => {
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
            <div className="search-results-cards">{mappedMovieResults}</div>
        </div>
    );
}

export default SearchResults;
