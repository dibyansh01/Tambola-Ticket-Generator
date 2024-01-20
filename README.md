

# Tambola Ticket Generator

Tambola Ticket Generator is a Node.js application that allows you to generate and save unique Tambola tickets in a PostgreSQL database and fetch it.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies and Libraries Used](#technologies-and-libraries-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Database Structure](#database-structure)
- [API Endpoints](#api-endpoints)
- [Demo](#demo)

## Introduction

Tambola Ticket Generator is a web-based application that provides functionality to generate and store unique Tambola tickets in a PostgreSQL database. The application ensures that only unique tickets are saved, and it offers endpoints to fetch the saved tickets.

## Features

- **Ticket Generation:** Generate Tambola tickets with a unique combination of numbers.
- **Database Storage:** Save generated tickets to a PostgreSQL database.
- **Uniqueness Check:** Ensure that only unique tickets are stored in the database.
- **Fetch Tickets:** Retrieve all saved tickets from the database.

## Technologies and Libraries Used

- JavaScript
- Node.js
- PostgreSQL
- Express


## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dibyansh01/Tambola-Ticket-Generator.git

2. Navigate to the project directory:
    ```bash
   cd Tambola-Ticket-Generator

3. Install dependencies:
    ```bash
   npm install

### Usage
1. Set up your PostgreSQL database and update the .env file with the database configuration.
2. To generate and save Tambola tickets, navigate to the 'src' directory and run the following command:
   ```bash
   cd src
   node generateTickets.js 4
  This will generate and save 4 sets of Tambola tickets, with each set containing 6 tickets. You can replace the number 4 with any positive value to generate a corresponding number of sets.
  
3. To retrieve all saved tickets from the database, execute the following command:
   ```bash
   //Start the backend server
   node server.js
  Now, open your browser or Postman and navigate to http://localhost:3000/tickets to access all saved ticket sets; by default, 12 tickets are displayed per page. To enable pagination through 
  the URL, you can make GET requests to the /tickets endpoint with query parameters for 'page' and 'pageSize'. For example, to retrieve the third page with a custom page size (e.g., 6 items per page), 
  use the following URL: http://localhost:3000/tickets?page=3&pageSize=6.


## Database Structure

  The application uses a PostgreSQL database with the following table structure:
  
     CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,
    ticket_set_id INT,
    ticket_number INT,
    ticket_data JSONB
);

The ticket_data column stores the JSON representation of Tambola tickets.



## API Endpoints
### Get All Tickets

#### `GET /tickets`

Fetches all Tambola tickets from the database with pagination support.

- **Request:**
  - Method: `GET`
  - Query Parameters:
    - `page` (Optional): Page number (default is 1).
    - `pageSize` (Optional): Number of items per page (default is 12).
  - Example: `/tickets?page=2&pageSize=6`

- **Response:**
  - Status: `200 OK`
  - Body: JSON
    ```json
    {
      "tickets": [/* Array of tickets for the specified page */]
    }
    ```

#### Pagination

Pagination is supported in the `/tickets` endpoint. You can use the `page` and `pageSize` query parameters to navigate through the pages of tickets.

Example:
- `/tickets?page=2&pageSize=5` will return the second page with 5 tickets per page.



## Demo

Here is the demonstration video:

https://github.com/dibyansh01/Tambola-Ticket-Generator/assets/129924389/166896fc-8fe4-4ded-803b-70c97e735af2



