import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchData } from "./Helpers";
import CustomerCard from "./CustomerCard";
import ManageCard from "./ManageCard";

function Customers() {
  const [customers, setCustomers] = useState([]); // List of customers
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Selected customer
  const [manageMode, setManageMode] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [countries, setCountries] = useState([]);
  const [showSearchContainer, setShowSearchContainer] = useState(true);
  const [newCustomer, setNewCustomer] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    district: "",
    city: "",
    country: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState(null);

  useEffect(() => {
    fetchData(`http://localhost:3001/countries`, setCountries);
    const url = searchQuery
      ? `http://localhost:3001/customers/search?q=${searchQuery}`
      : "http://localhost:3001/customers";
    fetchData(url, setCustomers); // Fetch and set customer data

    if (selectedCustomer) {
      fetchData(
        `http://localhost:3001/customers/details/${selectedCustomer.customer_id}`,
        setSelectedCustomer
      );
    }
  }, [searchQuery, refreshKey]); //

  const selectCustomer = async (id) => {
    // Selection of a customer
    fetchData(
      `http://localhost:3001/customers/details/${id}`,
      setSelectedCustomer
    );
  };

  const validateForm = () => {
    const errors = {};
    for (const [key, value] of Object.entries(newCustomer)) {
      if (!value) {
        errors[key] = "This field is required";
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addNewCustomer = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(
          `http://localhost:3001/customers/add`,
          newCustomer
        );
        const newCustomerId = response.data.newCustomerId;

        if (newCustomerId) {
          fetchData(
            `http://localhost:3001/customers/details/${newCustomerId}`,
            setSelectedCustomer
          );
        }

        setRefreshKey((prevKey) => prevKey + 1);
        setShowAddForm(false);
        alert("Customer added successfully!");
      } catch (error) {
        setFormStatus({ type: "error", message: "Failed to add new customer" });
      }
    }
  };

  const switchToManageMode = () => {
    setManageMode(true);
  };

  const handleUpdateSuccess = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleDeleteSuccess = () => {
    setSelectedCustomer(null); // Exit selected customer
    setManageMode(false); // Exit manage mode
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const updateReturnedMovie = (rental_id) => {
    // Find the rental object and update its return_date
    const updatedRentals = selectedCustomer.rentals.map((rental) => {
      if (rental.rental_id === rental_id) {
        rental.return_date = new Date().toISOString();
      }
      return rental;
    });

    setSelectedCustomer((prevCustomer) => ({
      ...prevCustomer,
      rentals: updatedRentals,
    }));
  };

  return (
    <div id="app-main" className="app-main">
      <div className="app-section">
        <button
          className="add-customer-button"
          onClick={() => {
            setShowAddForm(!showAddForm);
            setShowSearchContainer(showAddForm);
          }}
        >
          {" "}
          Add Customer
        </button>

        {formStatus && (
          <div className={`form-status ${formStatus.type}`}>
            {formStatus.message}
          </div>
        )}
        {showAddForm && (
          <div className="add-customer-form">
            <input
              className="add-input"
              type="text"
              placeholder="First Name"
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, first_name: e.target.value })
              }
            />
            <input
              className="add-input"
              type="text"
              placeholder="Last Name"
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, last_name: e.target.value })
              }
            />
            <input
              className="add-input"
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, email: e.target.value })
              }
            />
            <input
              className="add-input"
              type="text"
              placeholder="Address"
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, address: e.target.value })
              }
            />
            <input
              className="add-input"
              type="text"
              placeholder="District"
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, district: e.target.value })
              }
            />
            <input
              className="add-input"
              type="text"
              placeholder="City"
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, city: e.target.value })
              }
            />
            <select
              className="add-dropdown"
              value={newCustomer.country}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, country: e.target.value })
              }
            >
              <option value="" disabled>
                Select Country
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country.country}>
                  {country.country}
                </option>
              ))}
            </select>
            {formErrors.country && (
              <div className="error">{formErrors.country}</div>
            )}
            <input
              className="add-input"
              type="text"
              placeholder="Phone"
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, phone: e.target.value })
              }
            />
            <div className="buttons-container">
              <button
                className="submit-button"
                type="submit"
                onClick={addNewCustomer}
              >
                Submit
              </button>
              <button
                className="cancel-button"
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setShowSearchContainer(true);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {showSearchContainer && (
          <>
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on change
            placeholder="Search customers..."
          />
        </div>
        
        <ul className="customer-list">
          {customers.map((customer) => (
            <li
              className="customer-item"
              key={customer.customer_id}
              onClick={() => selectCustomer(customer.customer_id)} // Select customer
            >
              {customer.customer_id}: {customer.first_name} {customer.last_name}
            </li>
          ))}
        </ul>
        </>
        )}
      </div>
      <CustomerCard
        data={selectedCustomer}
        onClose={() => {
          setSelectedCustomer(null);
          setManageMode(false);
        }}
        onManage={switchToManageMode}
        onMovieReturn={updateReturnedMovie}
      />
      {manageMode && (
        <ManageCard
          type="customer"
          data={selectedCustomer}
          onClose={() => {
            setManageMode(false);
          }}
          onEditSuccess={handleUpdateSuccess}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}

export default Customers;
