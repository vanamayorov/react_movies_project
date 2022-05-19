import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addFilm, deleteFilm, getChosenFilms } from '../reducers/moviesToWatchReducerSlice';
import { removeFilm } from '../reducers/moviesReducerSlice';


const MovieItem = ({ movie }) => {
    const dispatch = useDispatch();
    const moviesToWatch = useSelector(getChosenFilms);

    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        if (moviesToWatch.find(item => item.id === movie.id)) setIsClicked(true);
        else setIsClicked(false);
    }, [moviesToWatch]); //eslint-disable-line

    const addMovie = movie => {
        dispatch(addFilm(movie));
    }

    const deleteMovie = movie => {
        dispatch(deleteFilm(movie));
    }

    const deleteForever = movie => {
        dispatch(deleteFilm(movie));
        dispatch(removeFilm(movie));
    }

    return (
        <div className="offset-1 col-10 offset-sm-0 col-sm-6 mt-4">
            <div className="card h-100">
                <img className="card-img-top" src={movie.backdrop_path ||
                    movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path ||
                    movie.poster_path}` : ""} alt="" />
                <div className="card-body">
                    <h6 className="card-title">
                        {movie.title}
                    </h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">Rating: {Math.ceil(movie.popularity)}</p>
                    </div>
                    <div className="d-flex justify-content-end align-items-center mt-auto">
                        {isClicked
                            ? <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteMovie(movie)}>Remove from watching list</button>
                            : <button type="button" className="btn btn-success btn-sm" onClick={() => addMovie(movie)}>Add Watch</button>
                        }

                        <button type="button" className="btn btn-danger btn-sm mx-2" onClick={() => deleteForever(movie)}>
                            <span className="material-icons">delete_forever</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieItem