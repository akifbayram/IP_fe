import React, { useState, useEffect } from 'react';
import { fetchData } from './Helpers';
import DetailsCard from "./DetailsCard";

function Movies() {
  const [movies, setMovies] = useState([]); // List of movies
  const [genres, setGenres] = useState([]); // List of genres
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('movie_name');
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchData('http://localhost:3001/movies/genres', setGenres);
    fetchData('http://localhost:3001/movies/all', setMovies);
  }, []);

  // Fetch data based on search query, search type, and genres
  useEffect(() => {
    const url = searchQuery // Based on search query, update the URL
      ? `http://localhost:3001/movies/search?q=${searchQuery}&type=${searchType}` : 'http://localhost:3001/movies/all';
    fetchData(url, setMovies);
  }, [searchQuery, searchType, genres]);
  
  // Fetch details for a selected movie
  const selectMovie = (id) => fetchData(`http://localhost:3001/movies/details/${id}`, setSelectedMovie);

  const searchTypeChange = (e) => { // Changes in search type dropdown
    const newType = e.target.value; // Extract value from dropdown
    setSearchType(newType);

    // If search type is 'movie_genre', set search query to first genre in list
    setSearchQuery(newType === 'movie_genre' ? genres[0].name : '');
  };

  return (
    <div id='app-main' className='app-main'>
      <div className='app-section'>
        <div className='search-container'>
          {searchType === 'movie_genre' ? (
            <select className='search-input' onChange={(e) => setSearchQuery(e.target.value)}>
              {genres.map((genre) => (
                <option key={genre.name} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              className='search-input'
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search movies by...'
            />
          )}
            <select className='dropdown-box' onChange={searchTypeChange}>
              <option value='movie_name'>Movie Name</option>
              <option value='movie_genre'>Movie Genre</option>
              <option value='actor_name'>Actor Name</option>
            </select>
        </div>
        <ul className='movie-list'>
          {movies.map((movie, index) => (
            <li key={`${movie.film_id}-${index}`} onClick={() => selectMovie(movie.film_id)}>
              {movie.film_id}: {movie.title}
            </li>
          ))}
        </ul>
      </div>
      <DetailsCard  type="movie" data={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}

export default Movies;