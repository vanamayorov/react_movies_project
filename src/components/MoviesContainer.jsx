import MoviesList from './MoviesList';
import { useDispatch, useSelector } from 'react-redux';
import { getPage, getSortBy } from "../reducers/sortBarReducerSlice";
import { errorStatus, getMovies } from "../reducers/moviesReducerSlice";
import { fetchFilms } from "../reducers/moviesReducerSlice";
import { useEffect } from "react";


const MoviesContainer = () => {
    const dispatch = useDispatch();
    const sortBy = useSelector(getSortBy);
    const page = useSelector(getPage);
    const movies = useSelector(getMovies);
    const error = useSelector(errorStatus);


    useEffect(() => {
        dispatch(fetchFilms({ sortBy, page }));
    }, [page, sortBy, dispatch]);

    return (
        <div className="col-8 col-sm-9">
            <div className="row">
                {error ? <h2>{error}</h2> : <MoviesList movies={movies} />}
            </div>
        </div>

    )
}

export default MoviesContainer;