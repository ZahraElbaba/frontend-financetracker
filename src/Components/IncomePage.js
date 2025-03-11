import React, { useState, useEffect } from 'react';
import './IncomePage.css';

const IncomePage = () => {
  const [activeTab, setActiveTab] = useState('weekly');
  const [incomeData, setIncomeData] = useState({
    weekly: { total: 0, change: 0, transactions: [] },
    monthly: { total: 0, change: 0, transactions: [] },
    yearly: { total: 0, change: 0, transactions: [] }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Format date to YYYY-MM-DD for API requests
  const formatDateForAPI = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Format date for display in the table
  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: '2-digit', 
      year: 'numeric' 
    });
  };

  useEffect(() => {
    fetchIncomeData();
  }, [activeTab, selectedDate]);

  const fetchIncomeData = async () => {
    setIsLoading(true);
    try {
      // Format date for API request
      const formattedDate = formatDateForAPI(selectedDate);
      
      // Fetch data from backend
      const response = await fetch(`/api/income?period=${activeTab}&date=${formattedDate}`);
      const data = await response.json();
      
      // Update state with fetched data
      setIncomeData(prevData => ({
        ...prevData,
        [activeTab]: data
      }));
    } catch (error) {
      console.error('Error fetching income data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddIncome = () => {
    // This would open a modal or navigate to add income form
    console.log('Add income clicked');
  };

  const handleExport = () => {
    // This would trigger data export
    console.log('Export clicked');
  };

  const handleFilter = () => {
    // This would open filter options
    console.log('Filter clicked');
  };

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const currentData = incomeData[activeTab] || { total: 0, change: 0, transactions: [] };
  
  // Filter transactions by category if needed
  const filteredTransactions = categoryFilter === 'all' 
    ? currentData.transactions 
    : currentData.transactions.filter(t => t.category.toLowerCase() === categoryFilter.toLowerCase());

  return (
    <div className="income-page">
      <div className="income-header">
        <div className="income-title">
          <h1>Income</h1>
          <p>Track and manage your income sources</p>
        </div>
        <div className="income-actions">
          <button className="btn btn-outline" onClick={handleFilter}>
            <span className="icon">⚙️</span> Filter
          </button>
          <button className="btn btn-outline" onClick={handleExport}>
            <span className="icon">⬇️</span> Export
          </button>
          <button className="btn btn-primary" onClick={handleAddIncome}>
            <span className="icon">+</span> Add Income
          </button>
        </div>
      </div>

      <div className="income-tabs-container">
        <div className="income-tabs">
          <button 
            className={`tab ${activeTab === 'weekly' ? 'active' : ''}`} 
            onClick={() => setActiveTab('weekly')}
          >
            Weekly
          </button>
          <button 
            className={`tab ${activeTab === 'monthly' ? 'active' : ''}`} 
            onClick={() => setActiveTab('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`tab ${activeTab === 'yearly' ? 'active' : ''}`} 
            onClick={() => setActiveTab('yearly')}
          >
            Yearly
          </button>
        </div>
        
        <div className="date-picker">
          <input 
            type="date" 
            value={formatDateForAPI(selectedDate)}
            onChange={handleDateChange}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="loading">Loading income data...</div>
      ) : (
        <div className="income-content">
          <div className="summary-cards">
            <div className="card">
              <div className="card-header">
                <h3>Total Income</h3>
                <span className="icon">📈</span>
              </div>
              <div className="card-content">
                <div className="amount">${currentData.total}</div>
                <p className="change">+{currentData.change}% from last {activeTab.slice(0, -2)}</p>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>{activeTab === 'yearly' ? 'Monthly Average' : 'Average Daily'}</h3>
                <span className="icon">📈</span>
              </div>
              <div className="card-content">
                <div className="amount">
                  ${(activeTab === 'weekly' ? currentData.total / 7 : 
                     activeTab === 'monthly' ? currentData.total / 30 : 
                     currentData.total / 12).toFixed(2)}
                </div>
                <p className="change">
                  {activeTab === 'weekly' ? '7 day average' : 
                   activeTab === 'monthly' ? '30 day average' : 
                   '12 month average'}
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>{activeTab === 'yearly' ? 'Highest Month' : 'Highest Income'}</h3>
                <span className="icon">📈</span>
              </div>
              <div className="card-content">
                <div className="amount">
                  ${activeTab === 'yearly' ? '7,500' : 
                    Math.max(...currentData.transactions.map(t => t.amount) || [0])}
                </div>
                <p className="change">
                  {activeTab === 'yearly' ? 'January (Salary + Bonus)' : 'Highest single transaction'}
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>{activeTab === 'yearly' ? 'Income Categories' : 'Income Sources'}</h3>
                <span className="icon">📈</span>
              </div>
              <div className="card-content">
                <div className="amount">
                  {activeTab === 'yearly' 
                    ? new Set(currentData.transactions.map(t => t.category)).size 
                    : new Set(currentData.transactions.map(t => t.source)).size}
                </div>
                <p className="change">
                  {activeTab === 'yearly' ? 'Different income categories' : 'Unique income sources'}
                </p>
              </div>
            </div>
          </div>

          <div className="card chart-card">
            <div className="card-header">
              <h2>
                {activeTab === 'weekly' ? 'Income Breakdown' : 
                 activeTab === 'monthly' ? 'Monthly Income Trend' : 
                 'Yearly Income Breakdown'}
              </h2>
              <p>
                {activeTab === 'weekly' ? 'Your income sources for the current week' : 
                 activeTab === 'monthly' ? 'Your income trend for the current month' : 
                 'Your income by month for the current year'}
              </p>
            </div>
            <div className="card-content">
              <div className="chart-placeholder">
                <p>Income chart visualization would appear here</p>
              </div>
            </div>
          </div>

          <div className="card transactions-card">
            <div className="card-header transactions-header">
              <div>
                <h2>
                  {activeTab === 'weekly' ? 'Recent Transactions' : 
                   activeTab === 'monthly' ? 'Monthly Transactions' : 
                   'Yearly Transactions'}
                </h2>
                <p>
                  {activeTab === 'weekly' ? 'Your recent income transactions' : 
                   activeTab === 'monthly' ? 'Your income transactions for this month' : 
                   'Your major income transactions for this year'}
                </p>
              </div>
            </div>

            <div className="card-content transactions-list">
              <div className="transactions-header">
                <div>
                  <label htmlFor="categoryFilter">Category:</label>
                  <select 
                    id="categoryFilter" 
                    value={categoryFilter}
                    onChange={handleCategoryFilterChange}
                  >
                    <option value="all">All</option>
                    <option value="salary">Salary</option>
                    <option value="bonus">Bonus</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>
              </div>

              <div className="transactions-table">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map(transaction => (
                    <div key={transaction.id} className="transaction-row">
                      <div className="transaction-date">
                        {formatDateForDisplay(transaction.date)}
                      </div>
                      <div className="transaction-source">
                        {transaction.source}
                      </div>
                      <div className="transaction-category">
                        {transaction.category}
                      </div>
                      <div className="transaction-amount">
                        ${transaction.amount}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-transactions">No transactions available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomePage;
