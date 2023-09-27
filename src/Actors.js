import React, { useState, useEffect } from "react";
import { fetchData } from './Helpers';
import DetailsCard from "./DetailsCard";

function Actors() {
  const [actors, setActors] = useState([]); // List of actors
  const [searchQuery, setSearchQuery] = useState(""); // Entered search query
  const [selectedActor, setSelectedActor] = useState(null); // Selected actor

  useEffect(() => {
    const url = searchQuery ? `http://localhost:3001/actors/search?q=${searchQuery}`:"http://localhost:3001/actors/all";
    fetchData(url, setActors); // Fetch and set actor data
  }, [searchQuery]); // Runs whenever `searchQuery` changes

  const selectActor = async (id) => { // Selection of a actor
    fetchData(`http://localhost:3001/actors/details/${id}`, setSelectedActor);
  };

  return (
    <div id="app-main" className="app-main">
      <div className="app-section">
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on change
            placeholder="Search actors..."
          />
        </div>
        <ul className="actor-list">
          {actors.map((actor) => (
            <li
              className="actor-item"
              key={actor.actor_id}
              onClick={() => selectActor(actor.actor_id)} // Select actor
            >
              {actor.actor_id}: {actor.first_name} {actor.last_name}
            </li>
          ))}
        </ul>
      </div>
      <DetailsCard type="actor" data={selectedActor} onClose={() => setSelectedActor(null)}
      />
    </div>
  );
}

export default Actors;