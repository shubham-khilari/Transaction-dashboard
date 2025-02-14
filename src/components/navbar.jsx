import React, { useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = ({ selectedMonth }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/transactions', {
        params: { month: selectedMonth, keyword: searchKeyword }
      });
      setSearchResults(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching transactions:', error);
    }
  };

  const handleClearSearch = () => {
    setSearchKeyword('');
    setSearchResults([]);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const displayedResults = searchResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="search-container">
      <nav>
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Enter keyword to search"
          className="search-input"
        />
        <button onClick={handleSearch}>Search Transactions</button>
        <button onClick={handleClearSearch} className="clear-button">
          <i className="fas fa-trash"></i>
        </button>
      </nav>

      {displayedResults.length > 0 && (
        <>
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
              {displayedResults.map(transaction => (
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

export default Navbar;