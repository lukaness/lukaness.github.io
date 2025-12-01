// Import the express module
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an instance of an Express application
const app = express();

// Define a port to listen on
const PORT = process.env.PORT || 3018;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies

// In-memory array to store saved objects
let objects = [];
let eduUsers = {};

// Define a simple route
app.get('/', (req, res) => {
    fs.readFile('./3Art.html', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

// POST route to save an object
app.post('/save-object', (req, res) => {
    const newObject = req.body; // Get the object from the request body
    objects.push(newObject); // Save the object to the in-memory array
    res.status(201).send({ message: 'Object saved successfully!', object: newObject });
});

// GET route to retrieve saved objects (for testing)
app.get('/objects', (req, res) => {
    res.json(objects);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
