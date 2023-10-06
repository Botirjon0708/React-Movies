import { Movie } from "../movie/Movie"

function Movies(props) {
    const { movies} = props
    
    return (
        <div className="movies">
            {movies.map(movie => {
                return <Movie key={movie.imdbID} {...movie} />
            } )}
        </div>
    )
}

export {Movies}