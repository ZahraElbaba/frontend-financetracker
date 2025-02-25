import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import "../Components/Home.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Home = () => {
  const [adminName, setAdminName] = useState("");
  const [summary, setSummary] = useState({ totalSalary: 0, upcomingPayments: [] });
  const [transactions, setTransactions] = useState([]);
  const [spendingData, setSpendingData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Get admin name from token
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAdminName(decoded.name);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    // Fetch Home Page Data
    axios.get("http://localhost:5001/api/home")
      .then(response => {
        setSummary({
          totalSalary: response.data.totalSalary || 0,
          upcomingPayments: response.data.upcomingPayments || [],
        });
        setTransactions(response.data.recentTransactions || []);
      })
      .catch(error => console.error("Error fetching home data:", error));

    // Fetch Spending Data for Chart
    axios.get("http://localhost:5001/api/spending")
      .then(response => {
        if (Array.isArray(response.data)) {
          const labels = response.data.map(item => item.day);
          const data = response.data.map(item => item.total);

          setSpendingData({
            labels,
            datasets: [{
              label: "Daily Spending",
              data,
              borderColor: "#4CAF50",
              backgroundColor: "rgba(76, 175, 80, 0.2)",
              tension: 0.4
            }]
          });
        }
      })
      .catch(error => console.error("Error fetching spending data:", error));
  }, []);

  return (
    <div className="home-container">
      <h1 className="title">Welcome {adminName}</h1>

      {/* Summary Section */}
      <div className="summary-section">
        <div className="card large-card">
          <h2>Total Salary</h2>
          <p className="amount">${summary.totalSalary.toFixed(2)}</p>
        </div>
        <div className="card">
          <h2>Upcoming Payments</h2>
          {summary.upcomingPayments.length === 0 ? (
            <p className="no-data">No upcoming payments</p>
          ) : (
            summary.upcomingPayments.map((payment, index) => (
              <div key={index} className="payment-item">
                <span>{payment.description}</span>
                <span className="amount">${payment.amount.toFixed(2)}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Transactions & Spending Chart */}
      <div className="bottom-section">
        <div className="card">
          <h2>Recent Transactions</h2>
          {transactions.length === 0 ? (
            <p className="no-data">No recent transactions</p>
          ) : (
            <ul>
              {transactions.map((t, index) => (
                <li key={index}>
                  <span>{t.description}</span>
                  <span className="amount">${t.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2>Spending Overview</h2>
          <Line data={spendingData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
