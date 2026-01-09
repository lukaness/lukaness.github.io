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
    fs.readFile('./Home/Console_en.html', 'utf8', (err, data) => {
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

app.get('/core', (req, res) => {
    fs.readFile('./core/Home_core.html', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

app.get('/core/home', (req, res) => {
    fs.readFile('./core/Home_core.html', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

app.get('/edu', (req, res) => {
    fs.readFile('./edu/Home_edu.html', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
            console.error("Error:" + err);
        } else {
            res.send(data);
        }
    })
});

app.post('/save-user', (req, res) => {
    const userInfo = req.body; // Get the object from the request body
    fs.writeFile('./edu/users/Users.json', 'utf8', (err, data) => {});
    fs.appendFile('./edu/users/Users.json', '{' + userInfo + '}', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Content has been appended');
    });
});

app.get('/users', (req, res) => {
fs.readFile('./edu/users/Users.json', 'utf8', (err, data) => {
    if (err) {
    res.send(err);
    } else {
    res.json(data);
    }

    });
});

app.get('/edu/openplay', (req, res) => {
    fs.readFile('./edu/Play_edu.html', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
            console.error("Error:" + err);
        } else {
            res.send(data);
        }
    })
});
