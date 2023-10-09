import React, { useState } from "react";
import axios from 'axios';

const CustomerCard = ({ data, onClose, onManage, onMovieReturn }) => {
  const [showRentals, setShowRentals] = useState(false);

  const toggleRentals = () => {
    setShowRentals(!showRentals);
  };

  const markAsReturned = async (rental_id) => {
    try {
      await axios.put(`http://localhost:3001/rentals/markAsReturned/${rental_id}`);
      onMovieReturn(rental_id); // Trigger re-render in parent
    } catch (error) {
      console.error('Failed to mark as returned:', error);
    }
  };


  return (
    <div className="app-section" hidden={!data}>
      {data && (
        <>
          <div className="card-header text-center">
            <span className="card-title">{`${data.first_name} ${data.last_name}`}</span>
            {onManage && (
              <button className="manage-button" onClick={onManage}>
                Manage Customer
              </button>
            )}
            <button className="close-mark" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="card-content">
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
                <b>District</b>: {data.district}
              </li>
              <li>
                <b>Country</b>: {data.country}
              </li>
              <li>
                <b>Phone</b>: {data.phone}
              </li>
            </ul>
            <button className="button" onClick={toggleRentals}>
              {showRentals ? "Hide Rentals" : "Show Rentals"}
            </button>
            {showRentals && (
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
                      <td>
                        {new Date(rental.rental_date).toLocaleDateString()}
                      </td>
                      <td>
                        {rental.return_date ? (
                          new Date(rental.return_date).toLocaleDateString()
                        ) : (
                          <>
                            <button className="return-button"
                              onClick={() => markAsReturned(rental.rental_id)}
                            >
                              Mark as Returned
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerCard;
