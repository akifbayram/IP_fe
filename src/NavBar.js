import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './NavBar.css';
import { exportCustomerReport } from './pdfExporter';

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch / export customer rentals report
  const exportReport = async () => {
    const response = await axios.get('http://localhost:3001/customers/rentals');
    exportCustomerReport(response.data);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item navbar-brand"><Link to="/">BlockBustr</Link></li>
        <li className="navbar-item"><Link to="/Movies">Movies</Link></li>
        <li className="navbar-item"><Link to="/Actors">Actors</Link></li>
        <li className="navbar-item"><Link to="/customers">Customers</Link></li>
        <li className="navbar-item" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
          <span>Report</span>
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={exportReport}>
                Customer Rental List
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;