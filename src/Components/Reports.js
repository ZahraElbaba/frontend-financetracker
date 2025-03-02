import React, { useState } from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { BarChart, PieChart } from '@mui/x-charts';

const Reports = () => {
  const [reportType, setReportType] = useState("yearly");
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState("bar");

  const fetchReportData = async () => {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`http://localhost:4000/api/reports/${reportType}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Process response data into a format suitable for chart
    const incomeData = response.data.incomes.map(income => ({
      category: income.category,
      amount: income.amount,
    }));
    const expenseData = response.data.expenses.map(expense => ({
      category: expense.category,
      amount: expense.amount,
    }));

    setChartData([...incomeData, ...expenseData]);
  };

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
    fetchReportData();
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  return (
    <div>
      <FormControl>
        <InputLabel>Report Type</InputLabel>
        <Select value={reportType} onChange={handleReportTypeChange}>
          <MenuItem value="yearly">Yearly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl>
        <InputLabel>Chart Type</InputLabel>
        <Select value={chartType} onChange={handleChartTypeChange}>
          <MenuItem value="bar">Bar Chart</MenuItem>
          <MenuItem value="pie">Pie Chart</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={fetchReportData}>Generate Report</Button>

      {chartType === "bar" ? (
        <BarChart
          data={chartData}
          xField="category"
          yField="amount"
        />
      ) : (
        <PieChart
          data={chartData}
          labelField="category"
          valueField="amount"
        />
      )}
    </div>
  );
};

export default Reports;
