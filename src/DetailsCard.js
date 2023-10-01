const DetailsCard = ({ type, data, onClose, onManage }) => {
  const renderDetails = () => {
    if (type === "actor") {
      return (
        <>
          <h3>
            {data.first_name} {data.last_name}
          </h3>
          <h4>Top Movies</h4>
          <ul>
            {data.top_movies.map((movie, index) => (
              <li key={index}>{movie.title}</li>
            ))}
          </ul>
        </>
      );
    } else if (type === "customer") {
      return (
        <>
          <ul className="customer-detail">
            <li>
              <b>Customer ID</b>: {data.customer_id}
            </li>
            <li>
              <b>Email</b>: {data.email}
            </li>
            <li>
              <b>Address</b>: {data.address}
            </li>
            <li>
              <b>City</b>: {data.city}
            </li>
            <li>
              <b>Country</b>: {data.country}
            </li>
            <li>
              <b>Phone</b>: {data.phone}
            </li>
          </ul>
          {/* <h3>Rentals:</h3>
          <table>
            <thead>
              <tr>
                <th>Movie Title</th>
                <th>Rental Date</th>
                <th>Return Date</th>
              </tr>
            </thead>
            <tbody>
              {data.rentals.map((rental, index) => (
                <tr key={index}>
                  <td>{rental.title}</td>
                  <td>{new Date(rental.rental_date).toLocaleDateString()}</td>
                  <td>
                    {rental.return_date
                      ? new Date(rental.return_date).toLocaleDateString()
                      : "Not yet"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </>
      );
    } else if (type === "movie") {
      return (
        <>
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
        </>
      );
    }
  };

  return (
    <div className="app-section" hidden={!data}>
      {data && (
        <>
                  <div className="card-header">
          <button className="manage-button" onClick={onManage}>
            Manage
          </button>
          <span className="card-title">
            {type === 'movie' ? data.title : `${data.first_name} ${data.last_name}`}
          </span>
          <button className="close-mark" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="card-content">
          {renderDetails()}
        </div>
        </>
      )}
    </div>
  );
};

export default DetailsCard;
