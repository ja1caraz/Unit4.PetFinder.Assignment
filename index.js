// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

// STRETCH GOAL: Problem 4: Serve a static index.html file
// The GET route for serving a static index.html file is currently "under construction". 
// Navigate to index.js and find the GET method at / 
// and write the code to serve a static index.html file.

// Pseudocode for Problem 4:
/*
1. Define a route handler for the GET method at '/' using Express.js.
2. Inside the route handler:
    a. Send the index.html file as the response.
    b. Make sure the index.html file is located in the 'public' folder.
*/
// Serve a static index.html file
app.get('/', (req, res) => {
    // Assuming index.html is located in the 'public' folder
    res.sendFile(__dirname + '/public/index.html');
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// Pseudocode for Problem 1:
/*
1. Define a route handler for the GET method at '/api/v1/pets' using Express.js.
2. Inside the route handler:
    a. Query the PostgreSQL database to retrieve all pets.
    b. Handle any errors that occur during the database query.
    c. If pets are successfully retrieved:
        - Send a JSON response with the list of pets.
    d. If an error occurs:
        - Send a 500 Internal Server Error response.
*/
// GET all pets from the database
app.get('/api/v1/pets', async (req, res) => {
    try {
        // Query the database to get all pets
        const { rows } = await pool.query('SELECT * FROM pets');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Problem 3: GET pet by owner's name with a query string
// The GET route for pets by owner's name is currently "under construction". 
// Navigate to index.js and find the GET method at /api/v1/pets/owner 
// and write the code to get a pet by owner's name from the database.

// Pseudocode for Problem 3:
/*
1. Define a route handler for the GET method at '/api/v1/pets/owner' using Express.js.
2. Inside the route handler:
    a. Extract the owner's name from the query string parameters.
    b. Query the PostgreSQL database to retrieve the pet owned by the specified owner.
    c. Handle any errors that occur during the database query.
    d. If the pet is found:
        - Send a JSON response with the pet's details.
    e. If the pet is not found:
        - Send a 404 Not Found response.
*/
// GET pet by owner's name with a query string
app.get('/api/v1/pets/owner', async (req, res) => {
    const owner = req.query.owner;

    try {
        // Query the database to get a pet by owner's name
        const { rows } = await pool.query('SELECT * FROM pets WHERE owner = $1', [owner]);
        
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Pet not found' });
        }
    } catch (error) {
        console.error('Error fetching pet by owner:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Problem 2: GET pets by name
// The GET route for pets by name is currently "under construction". 
// Navigate to index.js and find the GET method at /api/v1/pets/:name 
// and write the code to get a pet by name from the database.

// Pseudocode for Problem 2:
/*
1. Define a route handler for the GET method at '/api/v1/pets/:name' using Express.js.
2. Inside the route handler:
    a. Extract the pet's name from the request parameters.
    b. Query the PostgreSQL database to retrieve the pet with the specified name.
    c. Handle any errors that occur during the database query.
    d. If the pet is found:
        - Send a JSON response with the pet's details.
    e. If the pet is not found:
        - Send a 404 Not Found response.
*/
// GET pet by name
app.get('/api/v1/pets/:name', async (req, res) => {
    const name = req.params.name;

    try {
        // Query the database to get a pet by name
        const { rows } = await pool.query('SELECT * FROM pets WHERE name = $1', [name]);
        
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Pet not found' });
        }
    } catch (error) {
        console.error('Error fetching pet by name:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;