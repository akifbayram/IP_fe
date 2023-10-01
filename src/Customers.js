import React, { useState, useEffect } from "react";
import { fetchData } from "./Helpers";
import DetailsCard from "./DetailsCard";
import ManageCard from "./ManageCard";

function Customers() {
  const [customers, setCustomers] = useState([]); // List of customers
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Selected customer
  const [manageMode, setManageMode] = useState(false);

  useEffect(() => {
    const url = searchQuery
      ? `http://localhost:3001/customers/search?q=${searchQuery}`
      : "http://localhost:3001/customers";
    fetchData(url, setCustomers); // Fetch and set customer data
  }, [searchQuery]); // Run whenever `searchQuery` changes

  const selectCustomer = async (id) => {
    // Selection of a customer
    fetchData(
      `http://localhost:3001/customers/details/${id}`,
      setSelectedCustomer
    );
  };

  const switchToManageMode = () => {
    setManageMode(true);
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
      </div>
      <DetailsCard
        type="customer"
        data={selectedCustomer}
        onClose={() => { setSelectedCustomer(null);setManageMode(false); }}
        onManage={switchToManageMode}
      />
      {manageMode && (
        <ManageCard
          type="customer"
          data={selectedCustomer}
          onClose={() => {
            setManageMode(false);
          }}
        />
      )}
    </div>
  );
}

export default Customers;
