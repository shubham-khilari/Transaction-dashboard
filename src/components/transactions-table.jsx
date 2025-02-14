import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionsTable = ({ transactions, onMonthChange }) => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchedTransactions, setFetchedTransactions] = useState([]);
  const [statistics, setStatistics] = useState({ totalAmount: 0, totalSold: 0, totalNotSold: 0 });
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const itemsPerPage = 10;

  useEffect(() => {
    if (selectedMonth) {
      fetchTransactions();
    } else {
      setFetchedTransactions([]);
      setStatistics({ totalAmount: 0, totalSold: 0, totalNotSold: 0 });
      setChartData({ labels: [], datasets: [] });
    }
  }, [selectedMonth]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/transactions', {
        params: { month: selectedMonth }
      });
      setFetchedTransactions(response.data);
      calculateStatistics(response.data);
      generateChartData(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const calculateStatistics = (transactions) => {
    const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.price, 0);
    const totalSold = transactions.filter(transaction => transaction.sold).length;
    const totalNotSold = transactions.filter(transaction => !transaction.sold).length;
    setStatistics({ totalAmount, totalSold, totalNotSold });
  };

  const generateChartData = (transactions) => {
    const priceRanges = {
      '0-100': 0,
      '101-200': 0,
      '201-300': 0,
      '301-400': 0,
      '401-500': 0,
      '501+': 0,
    };

    transactions.forEach(transaction => {
      if (transaction.price <= 100) priceRanges['0-100']++;
      else if (transaction.price <= 200) priceRanges['101-200']++;
      else if (transaction.price <= 300) priceRanges['201-300']++;
      else if (transaction.price <= 400) priceRanges['301-400']++;
      else if (transaction.price <= 500) priceRanges['401-500']++;
      else priceRanges['501+']++;
    });

    setChartData({
      labels: Object.keys(priceRanges),
      datasets: [
        {
          label: 'Number of Items',
          data: Object.values(priceRanges),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setCurrentPage(1);
    onMonthChange(event.target.value);
  };

  const handleClearMonth = () => {
    setSelectedMonth('');
    onMonthChange('');
  };

  const totalPages = Math.ceil(fetchedTransactions.length / itemsPerPage);
  const displayedTransactions = fetchedTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <div className="month-selector">
        <select value={selectedMonth} onChange={handleMonthChange} className="search-input">
          <option value="">Select Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <button onClick={handleClearMonth} className="clear-button">
          <i className="fas fa-trash"></i>
        </button>
      </div>

      {displayedTransactions.length > 0 && (
        <>
          <div className="flex-container">
            <div className="statistics">
              <div>Total Amount of Sales: ${statistics.totalAmount.toFixed(2)}</div>
              <div>Total Sold Items: {statistics.totalSold}</div>
              <div>Total Not Sold Items: {statistics.totalNotSold}</div>
            </div>

            <div className="chart-container">
              <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Price Range Distribution' } } }} />
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Sold</th>
                <th>Image</th>
                <th>Month</th>
              </tr>
            </thead>
            <tbody>
              {displayedTransactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.title}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.price}</td>
                  <td>{transaction.sold ? 'Yes' : 'No'}</td>
                  <td><img src={transaction.image} alt={transaction.title} width="50" /></td>
                  <td>{new Date(transaction.dateOfSale).toLocaleString('default', { month: 'long' })}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous Page</button>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next Page</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionsTable;