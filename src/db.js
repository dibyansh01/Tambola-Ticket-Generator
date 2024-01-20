const { Pool } = require('pg');
const dotenv = require("dotenv");
const path = require('path');

const envPath = path.join(__dirname, '../.env'); //  .env is in the root folder

dotenv.config({ path: envPath });

const pool = new Pool({
    user: process.env.user,     
    host: process.env.host,
    database: process.env.database,  
    password: process.env.password,  
    port: process.env.port,
});

async function saveTicketsToDatabase(ticketSets) {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS tickets (
                id SERIAL PRIMARY KEY,
                ticket_set_id INT,
                ticket_number INT,
                ticket_data JSONB
            )
        `);

        // Fetch the current maximum ticket_set_id
        const result = await pool.query('SELECT MAX(ticket_set_id) FROM tickets');
        let ticketSetNumber = result.rows[0].max || 0;

        const savedTickets = [];

        for (const setNumber in ticketSets) {
            const tickets = ticketSets[setNumber].tickets;

            for (const ticketKey in tickets) {
                const ticketArray = tickets[ticketKey];

                // Check if a similar ticket already exists based on ticket_set_id, ticket_number, and ticket_data
                const existingTicket = await pool.query(
                    'SELECT id FROM tickets WHERE ticket_set_id = $1 AND ticket_number = $2 AND ticket_data = $3',
                    [ticketSetNumber + 1, ticketKey, JSON.stringify(ticketArray)]
                );

                if (existingTicket.rows.length === 0) {
                    // If not, insert the ticket
                    await pool.query(
                        `INSERT INTO tickets (ticket_set_id, ticket_number, ticket_data) VALUES ($1, $2, $3)`,
                        [ticketSetNumber + 1, ticketKey, JSON.stringify(ticketArray)]
                    );

                    savedTickets.push({
                        setNumber: setNumber,
                        ticketSetId: ticketSetNumber + 1,
                        ticketNumber: ticketKey,
                        ticketArray: ticketArray,
                    });
                }
            }

            ticketSetNumber++; // Increment ticketSetNumber for each set
        }

        console.log('Tickets saved to the database:');
        console.log(JSON.stringify(ticketSets, null, 2));

        return savedTickets;
    } catch (error) {
        console.error('Error saving tickets to the database:', error);
        return [];
    } 
}


module.exports = saveTicketsToDatabase;
