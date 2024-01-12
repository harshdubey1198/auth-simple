// Home.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="dashboard-content">
        <h2>Welcome, {user && user.email}!</h2>
        {user && <img src={user.photoURL} alt="profile" />}
        <hr />
        {/* Add more dashboard content here */}
      </div>
    </div>
  );
};

export default Home;
  