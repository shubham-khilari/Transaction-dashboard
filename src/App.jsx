import { useState, useEffect } from 'react';
import './App.css';
import TransactionsTable from './components/transactions-table';
import Navbar from './components/navbar';
import Heading from './components/heading';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.className = theme === 'dark' ? '' : 'light-theme';
  }, [theme]);

  const handleSearch = (searchResults) => {
    setTransactions(searchResults);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <div id="root">
        <Heading />
        <button onClick={toggleTheme} className="theme-toggle-button">
          {theme === 'dark' ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
        </button>
        <Navbar selectedMonth={selectedMonth} />
        <TransactionsTable transactions={transactions} onMonthChange={handleMonthChange} />
      </div>
    </>
  );
}

export default App;
