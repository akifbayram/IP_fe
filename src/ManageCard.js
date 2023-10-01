import React from "react";
import axios from "axios";

const ManageCard = ({ type, data, onClose }) => {
  const manageMovie = async () => {
    // Code to manage movie rentals
    console.log("Manage movie", data);
  };

  const manageCustomer = async () => {
    // Code to manage customer data
    console.log("Manage customer", data);
  };

  return (
    <div className="manage-section">
      <div className="card-header">
        <span className="card-title">
          <button className="close-mark" onClick={onClose}>
            &times;
          </button>
          {type === "movie" ? data.title : `Customer Management`}
        </span>
      </div>

      <div className="card-content">
        {type === "movie" && (
          <>
            <button className="button" onClick={manageMovie}>
              Rent Out
            </button>
          </>
        )}
        {type === "customer" && (
          <>
            <button className="button" onClick={manageCustomer}>
              Update Info
            </button>
            <button className="button" onClick={manageCustomer}>
              Delete
            </button>
            <button className="button" onClick={manageCustomer}>
              Mark as Returned
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageCard;
