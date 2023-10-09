import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageCard = ({ type, data, onClose, onEditSuccess, onDeleteSuccess }) => {
  const [showEditFields, setShowEditFields] = useState(false);
  const [editData, setEditData] = useState({});
  const [countries, setCountries] = useState([]);

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
    setEditData(prevState => ({ ...prevState, [name]: value }));
  };

  const editCustomer = async () => {
    try {
      console.log("Sending this payload to backend:", editData);  // Log the payload
      await axios.put(`http://localhost:3001/customers/update/${data.customer_id}`, editData);
      onEditSuccess();
    } catch (error) {
      console.error("Failed to edit customer:", error);
    }
  };

  const deleteCustomer = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/customers/delete/${data.customer_id}`
      );
      console.log(res.data.message); // Display success message
      onDeleteSuccess(); 
    } catch (error) {
      console.error(error);
    }
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
                />
                <input
                  className="update-input"
                  type="text"
                  name="last_name"
                  value={editData.last_name}
                  onChange={handleInputChange}
                />
                <input
                  className="update-input"
                  type="text"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                />
                <input
                  className="update-input"
                  type="text"
                  name="address"
                  value={editData.address}
                  onChange={handleInputChange}
                />
                <input
                  className="update-input"
                  type="text"
                  name="city"
                  value={editData.city}
                  onChange={handleInputChange}
                />
                <input
                  className="update-input"
                  type="text"
                  name="district"
                  value={editData.district}
                  onChange={handleInputChange}
                />
              <select
                className="update-dropdown"
                name="country"
                value={editData.country}
                onChange={handleInputChange}
              >
                <option value="" disabled>Select Country</option>
                {countries.map((c) => (
                  <option key={c.country_id} value={c.country}>
                    {c.country}
                  </option>
                ))}
              </select>
                <input
                  className="update-input"
                  type="text"
                  name="phone"
                  value={editData.phone}
                  onChange={handleInputChange}
                />

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
