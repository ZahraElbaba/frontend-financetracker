import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import { Button, TextField, Typography, Container } from '@mui/material';
import './Home.css';
import { Line } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Home = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountInput, setAmountInput] = useState('');
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState('');

  // Static income data
  const incomeData = [
    { amount: 1200, date: '2023-01-01' },
    { amount: 800, date: '2023-01-02' },
    { amount: 1500, date: '2023-01-03' },
    { amount: 1000, date: '2023-01-04' },
    { amount: 950, date: '2023-01-05' }
  ];

  // Function to add to the total amount
  const handleAddAmount = () => {
    const amountToAdd = parseFloat(amountInput);
    if (!isNaN(amountToAdd)) {
      setTotalAmount((prevTotal) => prevTotal + amountToAdd);
      setAmountInput('');
    }
  };

  // Function to subtract from the total amount
  const handleSubtractAmount = () => {
    const amountToSubtract = parseFloat(amountInput);
    if (!isNaN(amountToSubtract) && amountToSubtract <= totalAmount) {
      setTotalAmount((prevTotal) => prevTotal - amountToSubtract);
      setAmountInput('');
    }
  };

  // Function to add new payment to the list
  const handleAddPayment = () => {
    if (newPayment.trim() !== '') {
      setPayments([...payments, newPayment]);
      setNewPayment('');
    }
  };

  // Function to delete a payment
  const handleDeletePayment = (index) => {
    const updatedPayments = payments.filter((_, i) => i !== index);
    setPayments(updatedPayments);
  };

  // Chart Data
  const chartData = {
    labels: incomeData.map(entry => entry.date),
    datasets: [
      {
        label: 'Income Over Time',
        data: incomeData.map(entry => entry.amount),
        borderColor: '#2e7d32',
        backgroundColor: 'rgba(46, 125, 50, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="home-layout">
      <Sidebar />
      <Container className="home-container">
        {/* Top Section: Total Amount & Payments */}
        <div className="top-section">
          {/* Total Amount Card */}
          <div className="total-amount-card">
            <Typography variant="h6">Total Amount:</Typography>
            <Typography variant="h5" color="primary">${totalAmount.toFixed(2)}</Typography>
            <TextField
              className="amount-input"
              variant="outlined"
              placeholder="Enter amount"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              type="number"
            />
            <div className="buttons-group">
              <Button variant="contained" onClick={handleAddAmount}>Add</Button>
              <Button variant="contained" className="subtract-btn" onClick={handleSubtractAmount}>Subtract</Button>
            </div>
          </div>

          {/* Sticky Note for Payments */}
          <div className="sticky-note">
            <Typography className="sticky-note-title">Payments to Make</Typography>
            <TextField
              fullWidth
              placeholder="Add a payment..."
              value={newPayment}
              onChange={(e) => setNewPayment(e.target.value)}
            />
            <Button fullWidth variant="contained" onClick={handleAddPayment} style={{ marginTop: '10px' }}>
              Add Payment
            </Button>
            <div className="payment-list">
              {payments.map((payment, index) => (
                <div key={index} className="payment-item">
                  <Typography>{payment}</Typography>
                  <Button className="delete-button" onClick={() => handleDeletePayment(index)}>X</Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Income Graph */}
        <div className="income-graph">
          <Typography variant="h6">Income Chart</Typography>
          <Line data={chartData} />
        </div>
      </Container>
    </div>
  );
};

export default Home;
