import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageCard = ({
  type,
  data,
  onClose,
  onEditSuccess,
  onDeleteSuccess,
}) => {
  const [showEditFields, setShowEditFields] = useState(false);
  const [editData, setEditData] = useState({});
  const [countries, setCountries] = useState([]);
  const [customerQuery, setCustomerQuery] = useState("");
  const [customerSearchResults, setCustomerSearchResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    setEditData({
      first_name: data?.first_name || "",
      last_name: data?.last_name || "",
      email: data?.email || "",
      address: data?.address || "",
      city: data?.city || "",
      district: data?.district || "",
      country: data?.country || "",
      phone: data?.phone || "",
      address_id: data?.address_id || "",
      city_id: data?.city_id || "",
      country_id: data?.country_id || "",
    });
  }, [data]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("http://localhost:3001/countries");
        setCountries(res.data);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Search for customers
  const searchCustomers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/customers/search?q=${customerQuery}`
      );
      setCustomerSearchResults(res.data);
    } catch (error) {
      console.error("Failed to search customers:", error);
    }
  };

  const editCustomer = async () => {
    try {
      await axios.put(
        `http://localhost:3001/customers/update/${data.customer_id}`,
        editData
      );
      onEditSuccess();
    } catch (error) {
      console.error("Failed to edit customer:", error);
    }
  };

  const deleteCustomer = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
    if (confirmDelete) {
      try {
        const res = await axios.delete(
          `http://localhost:3001/customers/delete/${data.customer_id}`
        );
        console.log(res.data.message); // Display success message
        onDeleteSuccess();
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  const manageMovie = async () => {
    const confirmRent = window.confirm(
      `Are you sure you want to rent out ${data.title} to ${selectedCustomer.first_name} ${selectedCustomer.last_name}?`
    );
    if (confirmRent) {
      console.log("Sending this to backend:", {
        film_id: data.film_id,
        customer_id: selectedCustomer.customer_id,
      });
      try {
        await axios.post(`http://localhost:3001/rentals/new`, {
          film_id: data.film_id,
          customer_id: selectedCustomer.customer_id,
        });
        window.alert("Rental successful!");
        // Reload the page info here, if necessary
      } catch (error) {
        window.alert("Rental failed!");
        console.error(error);
      }
    }
  };

  return (
    <div className="manage-section">
      <div className="card-header">
        <span className="card-title">
          <button className="close-mark" onClick={onClose}>
            &times;
          </button>
          {type === "movie" ? "Rental Management" : `Customer Management`}
        </span>
      </div>
      <div className="card-content">
        {type === "movie" && (
          <>
            <div className="selected-info">
              <div>
                Selected Movie:
                <br /> 
                <b> {data.title}</b>
              </div>
              </div>
            <div className={`selected-info ${!selectedCustomer ? 'selected-info-red' : 'selected-info'}`}>
              <div>
                Selected Customer:
                <br />
                <b>
                  {" "}
                  {selectedCustomer
                    ? `${selectedCustomer.customer_id}: ${selectedCustomer.first_name} ${selectedCustomer.last_name}`
                    : "None Selected"}
                </b>
              </div>
            </div>
            {selectedCustomer && (
              <button className="rent-button" onClick={manageMovie}>
                Confirm
              </button>
            )}
            <div className="search-container">
              <input
                className="search-input"
                type="text"
                value={customerQuery}
                onChange={(e) => setCustomerQuery(e.target.value)}
                placeholder="Search for customer..."
              />
            </div>
            <button className="button" onClick={searchCustomers}>
              Search
            </button>
            <ul className="customer-list">
            {customerSearchResults.length > 0 ? (
              customerSearchResults.map((customer) => (
                <li
                  className="customer-item"
                  key={customer.customer_id}
                  onClick={() => setSelectedCustomer(customer)}
                >
                  {customer.customer_id}: {customer.first_name}{" "}
                  {customer.last_name}
                </li>
    ))
  ) : (
    <li className="no-results">No results</li>
  )}
</ul>
          </>
        )}
        {type === "customer" && (
          <>
            <button
              className="button"
              type="button"
              onClick={() => setShowEditFields(!showEditFields)}
            >
              Edit Customer
            </button>
            {showEditFields && (
              <form>
                <input
                  className="update-input"
                  type="text"
                  name="first_name"
                  value={editData.first_name}
                  onChange={handleInputChange}
                /><br/>
                <input
                  className="update-input"
                  type="text"
                  name="last_name"
                  value={editData.last_name}
                  onChange={handleInputChange}
                /><br/>
                <input
                  className="update-input"
                  type="text"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                /><br/>
                <input
                  className="update-input"
                  type="text"
                  name="address"
                  value={editData.address}
                  onChange={handleInputChange}
                /><br/>
                <input
                  className="update-input"
                  type="text"
                  name="city"
                  value={editData.city}
                  onChange={handleInputChange}
                /><br/>
                <input
                  className="update-input"
                  type="text"
                  name="district"
                  value={editData.district}
                  onChange={handleInputChange}
                /><br/>
                <select
                  className="update-dropdown"
                  name="country"
                  value={editData.country}
                  onChange={handleInputChange}
                ><br/>
                  <option value="" disabled>
                    Select Country
                  </option>
                  {countries.map((c) => (
                    <option key={c.country_id} value={c.country}>
                      {c.country}
                    </option>
                  ))}
                </select><br/>
                <input
                  className="update-input"
                  type="text"
                  name="phone"
                  value={editData.phone}
                  onChange={handleInputChange}
                /><br/>

                <button className="button" type="button" onClick={editCustomer}>
                  Update Info
                </button>
              </form>
            )}
            <button className="button" type="button" onClick={deleteCustomer}>
              Delete Customer
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageCard;
