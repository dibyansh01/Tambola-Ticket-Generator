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

// Route to get all saved tickets
app.get("/tickets", async (req, res) => {
    try {
        // Fetch all rows from the 'tickets' table
        const result = await pool.query('SELECT * FROM tickets');

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