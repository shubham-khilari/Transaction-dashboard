const express = require('express');
const cors = require('cors');
const products = require('./database.jsx');

const app = express();
const port = 5000;

app.use(cors());

app.get('/transactions', (req, res) => {
  const month = req.query.month;
  const keyword = req.query.keyword;

  let filteredTransactions = products;

  if (month) {
    filteredTransactions = filteredTransactions.filter(transaction => {
      const transactionMonth = new Date(transaction.dateOfSale).toLocaleString('default', { month: 'long' });
      return transactionMonth === month;
    });
  }

  if (keyword) {
    const lowerCaseKeyword = keyword.toLowerCase();
    filteredTransactions = filteredTransactions.filter(transaction => {
      return (
        transaction.id.toString().includes(lowerCaseKeyword) ||
        transaction.title.toLowerCase().includes(lowerCaseKeyword) ||
        transaction.description.toLowerCase().includes(lowerCaseKeyword) ||
        transaction.category.toLowerCase().includes(lowerCaseKeyword) ||
        transaction.price.toString().includes(lowerCaseKeyword) ||
        new Date(transaction.dateOfSale).toLocaleString('default', { month: 'long' }).toLowerCase().includes(lowerCaseKeyword)
      );
    });
  }

  res.json(filteredTransactions);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});