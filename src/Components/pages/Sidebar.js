import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Ensure this file styles the sidebar properly

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Finance Tracker</h2>
      <ul>
        <li><Link to="/home"> Home</Link></li>
        <li><Link to="/expenses">Expenses</Link></li>
        <li><Link to="/profit"> Profit</Link></li>
        <li><Link to="/income">Income</Link></li>
        <li><Link to="/login"> Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
