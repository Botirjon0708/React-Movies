import { Component } from "react";
import { Movies } from "../movies/Movies";
import { Preloader } from "../preloader/Preloader";
import {Search} from '../search/Search'
class Main extends Component{

    state = {
        movies: [],
    }


    componentDidMount () {
         fetch("http://www.omdbapi.com/?apikey=93408a14&s=matrix")
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search}))
    }

    searchMovies = async (str, type = 'all') => {
        await fetch(`http://www.omdbapi.com/?apikey=93408a14&s=${str}${type !== 'all' ? `&type=${type}` : '' }`)
            .then(response => response.json())
            .then(data => this.setState({ movies: data.Search }))
           
    }

    render() {
        const {movies} = this.state

        return (
          <main className="container content">
            <Search searchMovies={this.searchMovies} />
            {movies.length ? <Movies movies={movies} /> : <Preloader />}
          </main>
        );
    }
}

export { Main };