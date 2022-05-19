import MovieItem from "./MovieItem";

const MoviesList = ({ movies = [] }) => {
    return (
        movies.length
            ?
            movies.map(movie =>
                <MovieItem
                    movie={movie}
                    key={movie.id}
                />)
            :
            <h2>No movies cards</h2>
    );
}

export default MoviesList;
