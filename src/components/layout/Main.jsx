import {useState, useEffect } from "react";
import { Movies } from "../movies/Movies";
import { Preloader } from "../preloader/Preloader";
import { Search } from "../search/Search";


const API_KEY = process.env.REACT_APP_API_KEY;

const Main = () => {
const [movies, setMovies] = useState([])
const [loading, setLoading] = useState(true)


  useEffect( () => {
 fetch(`http://www.omdbapi.com/?apikey=${API_KEY}9&s=matrix`)
      .then((response) => response.json())
   .then((data) => {
     setMovies(data.Search);
     setLoading(false)
      } 
    )
   .catch((err) => {
     console.log(err);
     setLoading(false)
    })
},[])


   const searchMovies = async (str, type = "all") => {
   setLoading(true)
    await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${
        type !== "all" ? `&type=${type}` : ""
      }`
    )
      .then((response) => response.json())
      .then((data) => { 
        setLoading(false)
        searchMovies(data.Search)
      })
       .catch((err) =>{
         console.log(err)
         setLoading(false)
         
     })
  };


    return (
      <main className="container content">
        <Search searchMovies={searchMovies} />
        {loading ? <Preloader /> : <Movies movies={movies} />}
      </main>
    );
  
}

export { Main };
