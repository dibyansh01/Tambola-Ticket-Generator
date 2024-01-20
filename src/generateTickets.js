const { generateTicketSet } = require("./ticketGeneratorFun");
const saveTicketsToDatabase = require("./db");

// Check if N is provided as a command line argument
const N = process.argv[2];

if (!N) {
    console.error('Please provide a value for N as a command line argument.');
    process.exit(1); 
}

// Parse N as an integer
const numberOfSets = parseInt(N, 10);

// Check if the parsed value is a valid positive integer
if (isNaN(numberOfSets) || numberOfSets <= 0) {
    console.error('Please provide a valid positive integer for N.');
    process.exit(1); 
}

const ticketSets = generateTicketSet(numberOfSets);
saveTicketsToDatabase(ticketSets);
