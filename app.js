const express = require('express');
const { Pool } = require('/root/nodejs-backend/node_modules/pg'); // Import the PostgreSQL client
const app = express();
const port = 3000;

// Database configuration
const pool = new Pool({
  user: process.env.DB_USER || 'postgres', // PostgreSQL username
  host: process.env.DB_HOST || '52.21.136.107', // AWS PostgreSQL IP
  database: process.env.DB_NAME || 'myappdb', // Database name
  password: process.env.DB_PASSWORD || 'Kadupu@123', // PostgreSQL password
  port: process.env.DB_PORT || 5432, // PostgreSQL port
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// API route to query PostgreSQL
app.get('/api', async (req, res) => {
  try {
    // Query the "users" table
    const result = await pool.query('SELECT * FROM users'); // Query the "users" table
    res.json({ message: 'Hello from PostgreSQL!', data: result.rows });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Hello from Node.js backend on Azure!' });
  }
});

// Listen on all network interfaces (0.0.0.0) to be accessible externally
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});