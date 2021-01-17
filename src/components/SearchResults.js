import React, { useState, useEffect } from "react";
import { API_URL } from "../ConstantURLs";

function SearchResults(props) {
    // trying to get more than limit=10, but doesn't work: let searchQuery = (props.query + ', page=1')
    let searchQuery = props.query;

    const [movieResults, setMovieResults] = useState([]);
    const [savedNominations, setSavedNominations] = useState([]);
    const [disabled, setDisabled] = useState([])

    useEffect(() => {
        const fetchMovieSearchResults = async () => {
            const OMDB_API = `https://www.omdbapi.com/?apikey=700a3803&s=${searchQuery}&type=movie&page=1`;
            const response = await fetch(OMDB_API);
            const fetchData = await response.json();
            // console.log(fetchData.Search);
            setMovieResults(fetchData.Search);
            // the response from OMDB_API default only serves the limit=10 movies in the fetch
            // an OMDB npm plugin (npm i omdb) exists where you can use set params on an omdb function: omdb.search('true', page=1) ((or: omdb.search_movie('true', page=2))) // each page serves 100 movies per page
        };

        fetchMovieSearchResults();
        fetchNominatedMovies();
    }, [searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchNominatedMovies = async () => {
        const response = await fetch(API_URL + "/nominated_movies");
        const fetchData = await response.json();
        const funneledData = fetchData.nominated_movies;
        setSavedNominations(funneledData);
        // console.log("fetchNominatedMovies", savedNominations);
    };

    const handleOnClick = (e, movie) => {
        // console.log(e, movie)
        // e.target.disabled = true
        setDisabled([...disabled, movie.imdbID])
        handleNomination(movie);
    };

    const handleNomination = async (movie) => {
        if (savedNominations.length === 4) {
            alert("Congratulations, you Have 5 nominations & have finished!");
        }
        if (savedNominations.length < 5) {
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

                setSavedNominations((prevState) => {
                    // console.log("prevstate", prevState);
                    return [...prevState, data];
                });
            };
            postMovieNominations();
        } else {
            console.log("NO MORE THAN 5", movie);
            console.log("result", savedNominations);
            alert(
                "Only 5 nominations allowed. On the Nominations page you can delete a previous nomination to choose this movie instead."
            );
        }
        
    };

    const mappedMovieResults = (movieResults) ? (movieResults.map((movie) => {
        const poster = (movie.Poster === "N/A" ? "https://i.imgur.com/o5qfWB0.png" : movie.Poster)
        return (
            <div className="ind-movie-div" key={movie.imdbID}>
                <img src={poster} alt={movie.Title} />
                <h3>{movie.Title}</h3>
                <p>Release Year: {movie.Year}</p>

                <button disabled={disabled.indexOf(movie.imdbID)!== -1} onClick={(e) => handleOnClick(e, movie)} style={{
                    // backgroundColor: `${color}`,
                    width: '10em',
                    height: '1.5em'
                }}>
                    &#10003; Nominate
                </button>
            </div>
        );
    })) : null

    if (mappedMovieResults) {
        return (
            console.log(disabled),
            <div className="search-results">
                <div className="search-results-cards">{mappedMovieResults}</div>
            </div>
        );
    } else {
        return (
            <div className="search-results">
                <div>
                    <h3>
                        Your Search Did Not Return Any Results, Please Try Again
                    </h3>
                </div>
            </div>
        );
    }
}

export default SearchResults;
