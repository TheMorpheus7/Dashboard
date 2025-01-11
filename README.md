# MERN Stack Coding Challenge

This project showcases a MERN stack application with APIs for handling product transaction data and a frontend interface for data visualization.

## Backend Tasks

1. **Initialize Database**:
   - Fetch data from the third-party API:  
     **URL**: `https://s3.amazonaws.com/roxiler.com/product_transaction.json`  
     **Method**: `GET`  
     **Response Format**: `JSON`
   - Create an API to initialize the database with seed data from the fetched JSON.

2. **APIs**:
   - **Transactions API**:
     - List all transactions with search and pagination.
     - Search based on title, description, or price.
   - **Statistics API**:
     - Total sales amount, total sold items, and total unsold items for a selected month.
   - **Bar Chart API**:
     - Returns price ranges and the number of items in each range for the selected month.
   - **Pie Chart API**:
     - Returns unique categories and item counts for each category in the selected month.
   - **Combined API**:
     - Combines the responses of the above three APIs into a single JSON.

## Frontend Tasks

1. **Transactions Table**:
   - Display transactions with month-wise filtering (default: March).
   - Support search and pagination.

2. **Statistics**:
   - Display total sales amount, sold items, and unsold items for the selected month.

3. **Bar Chart**:
   - Visualize price ranges and item counts for the selected month.

4. **Pie Chart**:
   - Display categories and item counts for the selected month.

## Instructions
- Use APIs to populate tables and charts.
- Implement responsive design for better usability.

---

Feel free to modify this as needed! Let me know if you want additional features or sections added.
