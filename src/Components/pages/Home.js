import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import './Home.css';
import { Button, Typography, Container } from '@mui/material';

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        window.location.href = '/login';
        return;
      }
      try {
        const response = await axios.get('http://localhost:4000/api/home', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('User Data:', response.data); // Log to check response data
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching home data:', error);
        window.location.href = '/login'; // Redirect to login on error
      }
    };

    fetchHomeData();
  }, []);

  const handleEdit = () => {
    // Implement edit functionality if needed
  };

  return (
    <div className="home-layout">
      <Sidebar /> {/* Sidebar added here */}
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
