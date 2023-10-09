import React, { useState, useEffect } from "react";
import { fetchData } from "./Helpers";
import MovieCard from "./MovieCard";
import ManageCard from "./ManageCard";

function Movies() {
  const [movies, setMovies] = useState([]); // List of movies
  const [genres, setGenres] = useState([]); // List of genres
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("movie_name");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [manageMode, setManageMode] = useState(false);
  const sanitizeInput = (input) => {
    return input.replace(/[#<>"'%;()&+]/g, "");
  };

  useEffect(() => {
    fetchData("http://localhost:3001/movies/genres", setGenres);
    fetchData("http://localhost:3001/movies/all", setMovies);
  }, []);

  // Fetch data based on search query, search type, and genres
  useEffect(() => {
    // Validate 'searchType'
    const allowedTypes = ["movie_name", "movie_genre", "actor_name"];
    if (!allowedTypes.includes(searchType)) {
      console.error("Invalid search type");
      return;
    }

    // Sanitize 'searchQuery'
    const sanitizedQuery = sanitizeInput(searchQuery);

    const url = sanitizedQuery
      ? `http://localhost:3001/movies/search?q=${sanitizedQuery}&type=${searchType}`
      : "http://localhost:3001/movies/all";
    fetchData(url, setMovies);
  }, [searchQuery, searchType, genres]);

  // Fetch details for a selected movie
  const selectMovie = (id) =>
    fetchData(`http://localhost:3001/movies/details/${id}`, setSelectedMovie);

  const searchTypeChange = (e) => {
    // Changes in search type dropdown
    const newType = e.target.value; // Extract value from dropdown
    setSearchType(newType);

    // If search type is 'movie_genre', set search query to first genre in list
    setSearchQuery(newType === "movie_genre" ? genres[0].name : "");
  };

  const switchToManageMode = () => {
    setManageMode(true);
  };

  return (
    <div id="app-main" className="app-main">
      <div className="app-section">
        <div className="search-container">
          {searchType === "movie_genre" ? (
            <select
              className="search-input"
              onChange={(e) => setSearchQuery(e.target.value)}
            >
              {genres.map((genre) => (
                <option key={genre.name} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(sanitizeInput(e.target.value))} // Sanitize input on change
              placeholder="Search movies by..."
            />
          )}
          <select className="dropdown-box" onChange={searchTypeChange}>
            <option value="movie_name">Movie Name</option>
            <option value="movie_genre">Movie Genre</option>
            <option value="actor_name">Actor Name</option>
          </select>
        </div>
        <ul className="movie-list">
          {movies.map((movie, index) => (
            <li
              key={`${movie.film_id}-${index}`}
              onClick={() => selectMovie(movie.film_id)}
            >
              {movie.film_id}: {movie.title}
            </li>
          ))}
        </ul>
      </div>
      <MovieCard
        data={selectedMovie}
        onClose={() => {
          setSelectedMovie(null);
          setManageMode(false);
        }}
        onManage={switchToManageMode}
      />
      {manageMode && (
        <ManageCard
          type="movie"
          data={selectedMovie}
          onClose={() => {
            setManageMode(false);
          }}
        />
      )}
    </div>
  );
}

export default Movies;
