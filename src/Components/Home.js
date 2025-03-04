import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import './Home.css';
import { Button, Typography, Container } from '@mui/material';

const Home = () => {
  const [userData, setUserData] = useState(null);

  const handleEdit = () => {
    alert('Edit feature coming soon!');
  };

  return (
    <div className="home-layout">
      <Sidebar />
      <Container className="home-container">
        {userData ? (
          <div className="home-welcome">
            <Typography variant="h4" className="home-welcome-text">
              Welcome {userData.name}
            </Typography>
            <Typography variant="h6" className="home-total-amount">
              Total Amount: {userData.totalAmount}
            </Typography>
            <Button variant="outlined" onClick={handleEdit} className="home-edit-btn">
              Edit
            </Button>
          </div>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Container>
    </div>
  );
};

export default Home;
