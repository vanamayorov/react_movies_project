import { useEffect } from "react";
import MovieItem from "./MovieItem";
import { useDispatch, useSelector } from 'react-redux';
import { getChosenFilms } from '../reducers/moviesToWatchReducerSlice';
import { getPage, getSortBy } from "../reducers/sortBarReducerSlice";
import { getMovies } from "../reducers/moviesReducerSlice";
import { fetchFilms } from "../reducers/moviesReducerSlice";


const MoviesList = () => {
    const dispatch = useDispatch();
    const moviesToWatch = useSelector(getChosenFilms);
    const sortBy = useSelector(getSortBy);
    const page = useSelector(getPage);
    const movies = useSelector(getMovies);

    useEffect(() => {
        dispatch(fetchFilms({ sortBy, page }));
    }, [page, sortBy, dispatch]);


    return (
        <div className="col-8 col-sm-9">
            <div className="row">
                {movies?.length
                    ?
                    movies.map(movie =>
                        <MovieItem
                            moviesToWatch={moviesToWatch}
                            movie={movie}
                            key={movie.id}
                        />)
                    : <h2>No cards</h2>
                }
            </div>
        </div>
    );
}

export default MoviesList;
