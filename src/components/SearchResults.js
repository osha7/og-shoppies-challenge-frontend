import React, { useState, useEffect } from "react";
import { API_URL } from "../ConstantURLs";

function SearchResults(props) {
    let searchQuery = props.query;

    const [movieResults, setMovieResults] = useState([]);
    const [savedNominations, setSavedNominations] = useState([]);
    const [disabled, setDisabled] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {

        fetchMovieSearchResults();
        fetchNominatedMovies();
    }, [searchQuery, page]); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchMovieSearchResults = async () => {
        console.log(page)
        const OMDB_API = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${searchQuery}&type=movie&page=${page || 1}`;
        
        const response = await fetch(OMDB_API);
        const fetchData = await response.json();
        // console.log(fetchData.Search);
        setMovieResults(fetchData.Search);
    };

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
                console.log(savedNominations.length)
                props.setCount(savedNominations.length)
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

                <button disabled={disabled.indexOf(movie.imdbID)!== -1} onClick={(e) => handleOnClick(e, movie)} >
                    <span className="btn-text">&#10003; Nominate</span>
                </button>
            </div>
        );
    })) : null

    if (mappedMovieResults) {
        return (
            console.log(disabled),
            console.log(props),
            <div className="search-results">
                <div className="search-results-cards">{mappedMovieResults}</div>
                <div className="change-page">
                    <button onClick={page > 1 ? (() => setPage(page - 1)) : (() => setPage(1))}>Previous</button>
                    <button onClick={() => setPage(page + 1)}>Next</button>
                </div>
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
