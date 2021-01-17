import React, { useState, useEffect } from 'react';
import {API_URL} from '../ConstantURLs';

function MovieNominations(props) {

    const [nominationsOfMovies, setNominationsOfMovies] = useState([])
    const [nominationLength, setNominationLength] = useState(0)
    // const nominationLength = nominationsOfMovies.length

    useEffect(() => {
        
        fetchNominations()
        
    }, [nominationLength])

    const fetchNominations = async() => {
        const response = await fetch(API_URL + "/nominated_movies")
        const fetchData = await response.json()
        const funneledData = fetchData.nominated_movies
        setNominationsOfMovies(funneledData)
    }


    const handleDelete = (nomination) => {
        console.group("here in Delete", nomination)
        const deleteNomination = async () => {
            const settings = {
                method: "DELETE"
            }
            const response = await fetch(
                API_URL + `/nominated_movies/${nomination.id}`,
                settings
            )
            if (!response.ok) throw Error(response.message);
            const data = await response.json()
            console.log("need to know data", data.notice)
            if (data.notice) {
                alert(data.notice)
                console.log(nominationLength)
                setNominationLength(prevState => {
                    console.log("prevstate", prevState)
                    return [prevState - 1]
                })

            } else {
                alert(data.error)
            }
        }
        deleteNomination()
    }

    const mappedNominations = nominationsOfMovies.map((nomination) => {
        // console.log(nomination)
        return (
            <div className="ind-movie-div" key={nomination.imdbID} >
                <img src={nomination.poster} alt={nomination.title} />
                <h3>{nomination.title}</h3>
                <p>Release Year: {nomination.year}</p>
                <button onClick={() => handleDelete(nomination)}>Delete</button>
            </div>
        )
    })

    return (
        console.log(nominationLength),
        <div className="nomination-results">
        <div className="nomination-results-cards">{mappedNominations}</div>
    </div>
    );
}

export default MovieNominations;