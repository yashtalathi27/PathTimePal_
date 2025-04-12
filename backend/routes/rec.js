const express = require('express');
const route = express.Router();

// Import the functions from recController
const { userLogin, getJobs } = require('../controllers/recController');

// Define the routes and assign the corresponding functions
route.post('/login', userLogin);
route.get('/jobs/:id', getJobs);

// Export the router
module.exports = route;
