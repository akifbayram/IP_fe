import React from "react";

const MovieCard = ({ data, onClose, onManage }) => {
  return (
    <div className="app-section" hidden={!data}>
      {data && (
        <>
          <div className="card-header">
            {onManage && (
              <button className="manage-button" onClick={onManage}>
                Manage
              </button>
            )}
            <span className="card-title">{data.title}</span>
            <button className="close-mark" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="card-content">
            <ul className="movie-detail">
              <li>
                <b>Release Year</b>: {data.release_year}
              </li>
              <li>
                <b>Genre</b>: {data.category}
              </li>
              <li>
                <b>Length</b>: {data.length} mins
              </li>
              <li>
                <b>Rating</b>: {data.rating}
              </li>
            </ul>
            <h3>Actors:</h3>
            <ul className="movie-actors-list">
              {data.actors.split(",").map((actor, index) => (
                <li key={index}>{actor}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieCard;
