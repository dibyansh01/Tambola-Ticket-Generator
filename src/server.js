const express = require("express");
const { Pool } = require('pg');
const dotenv = require("dotenv");
const path = require('path');

const envPath = path.join(__dirname, '../.env'); //  .env is in the root folder

dotenv.config({ path: envPath });

const app = express();

app.use(express.json());

// PostgreSQL configuration
const pool = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
});

// Route to get paginated tickets
app.get("/tickets", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Current page number, default is 1
        const pageSize = parseInt(req.query.pageSize) || 12; // Number of items per page, default is 12

        const offset = (page - 1) * pageSize; // Calculate offset

        // Fetch paginated rows from the 'tickets' table
        const result = await pool.query('SELECT * FROM tickets ORDER BY id LIMIT $1 OFFSET $2', [pageSize, offset]);

        // Extract rows from the result
        const tickets = result.rows;

        res.status(200).json({ tickets });
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3000, () => {
    console.log("Listening to port 3000");
});