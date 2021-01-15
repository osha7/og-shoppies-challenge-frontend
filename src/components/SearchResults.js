import React, { useState, useEffect} from 'react';

function SearchResults(props) {

    // trying to get more than limit=10, but doesn't work: let searchQuery = (props.query + ', page=1')
    let searchQuery = props.query
    
    const [movieResults, setMovieResults] = useState([])

    useEffect(() => {
        const fetchMovieSearchResults = async () => {
            const OMDB_API = `http://www.omdbapi.com/?apikey=700a3803&s=${searchQuery}` 
            const response = await fetch(OMDB_API)
            const fetchData = await response.json()
            console.log(fetchData.Search) 
            setMovieResults(fetchData.Search)
            // the response from OMDB_API default only serves limit of 10 movies in the fetch
            // an OMDB npm plugin (npm i omdb) exists where you can use set params on an omdb function: omdb.search('true', page=1) ((or: omdb.search_movie('true', page=2))) // each page serves 100 movies per page
        }

        fetchMovieSearchResults()
    }, [searchQuery])
    
    const results1 = movieResults.map(movie => {
        console.log(movie)
       return(
        <div className="ind-movie-div" key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>Release Year: {movie.Year}</p>
            <button>&#10003; Nominate</button>
        </div>
       ) 
    })
    
    return (
        <div className="search-results">
            {console.log(movieResults)}
            <h2>Results</h2>
            <div className="search-results-cards" >
                {results1}
            </div>
        </div>
    );
}

export default SearchResults;