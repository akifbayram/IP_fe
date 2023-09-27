import React, { useState, useEffect } from 'react';
import { fetchData } from './Helpers';
import DetailsCard from "./DetailsCard";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedActor, setSelectedActor] = useState(null);

  // Fetch top movies / actors on page load
  useEffect(() => {
    fetchData('http://localhost:3001/movies/top', setMovies);
    fetchData('http://localhost:3001/actors/top', setActors);
  }, []);

  // Fetch / set details of selected movie / actor
  const selectMovie = (id) => fetchData(`http://localhost:3001/movies/details/${id}`, setSelectedMovie);
  const selectActor = (id) => fetchData(`http://localhost:3001/actors/details/${id}`, setSelectedActor);

  // Close details cards
  const closeMovieDetails = () => setSelectedMovie(null);
  const closeActorDetails = () => setSelectedActor(null);

  return (
    <div id="app-main" className="app-main">
      <div className="app-section">
        <h2>Top 5 Movies</h2>
        <ul>
          {movies.map((movie) => (
            <li key={movie.film_id} onClick={() => selectMovie(movie.film_id)}>
              {movie.title}
            </li>
          ))}
        </ul>
      </div>
      <DetailsCard type="movie" data={selectedMovie} onClose={closeMovieDetails} />
      <div className="app-section">
        <h2>Top 5 Actors</h2>
        <ul>
          {actors.map((actor) => (
            <li key={actor.actor_id} onClick={() => selectActor(actor.actor_id)}>
              {actor.first_name} {actor.last_name}
            </li>
          ))}
        </ul>
      </div>
      <DetailsCard type="actor" data={selectedActor} onClose={closeActorDetails} />
    </div>
  );
};

export default HomePage;
