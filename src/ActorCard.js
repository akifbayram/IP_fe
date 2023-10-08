import React from "react";

const ActorCard = ({ data, onClose }) => {
  return (
    <div className="app-section" hidden={!data}>
      {data && (
        <>
          <div className="card-header">
            <span className="card-title">{`${data.first_name} ${data.last_name}`}</span>
            <button className="close-mark" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="card-content">
            <h4>Top Movies</h4>
            <ul>
              {data.top_movies.map((movie, index) => (
                <li key={index}>{movie.title}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ActorCard;
