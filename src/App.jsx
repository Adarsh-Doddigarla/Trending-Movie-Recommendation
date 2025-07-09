import React, { useState,useEffect } from 'react'
import Search from './Components/Search.jsx'
import Spinner from './Components/Spinner.jsx';
import MovieCard from './Components/MovieCard.jsx';
import {useDebounce} from 'react-use'
import { updateSearchCount } from './appwrite.js';
import { Query } from 'appwrite';
import { getTrendingMovies } from './appwrite.js';

const API_BASE_URL= 'https://api.themoviedb.org/3';
const API_KEY= import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
  accept: 'application/json',
  Authorization: `Bearer ${API_KEY}`
  }
}
const App = () => {

  const [searchTerm, setSearchTerm]= useState("")
  const [errorMessage, seterrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const[debouncedSearchTerm, setdebouncedSearchTerm] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(false);

  useDebounce(()=>setdebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async(query='') =>{
    setLoading(true);
    seterrorMessage("");
    try {

      const endpoint= query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS)

      if(!response.ok){
        throw new Error(`Failed to fetch Movies`);
      }
      const data=await response.json();

      if(data.response==='false'){
        seterrorMessage("No movies found. Please try a different search term.");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
      if(query && data.results.length >0){
        // Update search count in Appwrite database
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error("Error fetching movies: ${error}");
      seterrorMessage("Failed to fetch movies. Please try again later.");
    }
    finally {
      setLoading(false);
    }
  }
  const loadTrendingMovies = async () => {
    setTrendingLoading(true);
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
      setTrendingMovies([]);
    }finally {
    setTrendingLoading(false);
  }
  }

  useEffect(()=>{
    fetchMovies(debouncedSearchTerm);
  },[debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  },[]);

  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
        
        <header>
          <img src="/hero-img.png" alt="Hero" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        
        {trendingLoading ? (
          <Spinner />
        ) : (
        trendingMovies.length > 0 &&(
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) =>(
                <li key={movie.$id}>
                  <p>{index+1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        ))}
        <section className='all-movies'>
          <h2 >All movies</h2>
          {loading ? (
            <Spinner />
          ): errorMessage ? (
             <p className='text-red-500'>{errorMessage}</p>
          ):(
           <ul>
            {movieList.map((movie)=>(
              <MovieCard key={movie.id} movie={movie}/>
            ))}
           </ul> 
          )}
        </section>

      </div>
    </main>
  )
}

export default App