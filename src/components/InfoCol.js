import React from 'react'
import { useSelector } from 'react-redux';
import { getChosenFilms } from '../reducers/moviesToWatchReducerSlice';

const InfoCol = () => {
    const movies = useSelector(getChosenFilms);
    return (
        <div className="col-4 col-sm-3 mt-4">
            <h4>Will Watch: {movies.length}
                <br /> movies
            </h4>
            {movies.length
                ?
                <ul className="list-group">
                    {movies.map(movie =>
                        <li className="list-group-item" key={movie.id}>
                            <div className="d-flex justify-content-between flex-column">
                                <p> {movie.title} </p>
                                <p> {Math.ceil(movie.popularity)} </p>
                            </div>
                        </li>
                    )}
                </ul>
                : ""
            }
        </div>
    );
}

export const MemoInfoCol = React.memo(InfoCol);