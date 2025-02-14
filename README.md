# Transaction Dashboard

This transaction dashboard project allows users to search and filter transactions by month and keyword. It also includes a theme toggle button to switch between light and dark themes.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/shubham-khilari/Transaction-dashboard
    cd Transaction-dashboard
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

## Running the Application

1. Start the development server:

    ```sh
    npm run dev
    ```

    This will start both the Express server and the Vite development server concurrently.

2. Open your browser and navigate to `http://localhost:3000` to view the transaction dashboard.

## Features

- **Search Transactions**: Enter a keyword to search for transactions. The results will be displayed in a paginated table.
- **Filter by Month**: Select a month from the dropdown to filter transactions by the selected month.
- **Pagination**: You can navigate through the pages of transactions using the "Previous Page" and "Next Page" buttons.
- **Theme Toggle**: Switch between light and dark themes using the theme toggle button located at the top right corner of the viewport.

## Project Structure

- [src](http://_vscodecontentref_/1): Contains the source code for the project.
  - `components/`: Contains the React components used in the project.
    - `navbar.jsx`: The Navbar component that handles the search functionality.
    - [transactions-table.jsx](http://_vscodecontentref_/2): The TransactionsTable component that displays the transactions in a table format.
    - `heading.jsx`: The Heading component that displays the heading of the dashboard.
  - [App.jsx](http://_vscodecontentref_/3): The main App component that renders the Navbar, TransactionsTable, and Heading components.
  - [App.css](http://_vscodecontentref_/4): The CSS file that contains the styles for the project.
- [public](http://_vscodecontentref_/5): Contains the public assets for the project.
- `server.cjs`: The Express server that handles the API requests for transactions.

## Dependencies

- React
- Axios
- Express
- Font Awesome
- Chart.js

## License

This project is licensed under the MIT License.
