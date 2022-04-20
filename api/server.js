const express = require('express'); 

// Import All routes
const moviesRouter = require('./movies/movie-router')
const ratingRouter = require('./ratings/rating-router')
const starsRouter = require('./stars/star-router')

const server = express();
server.use(express.json());

// Create api for all routes
server.use('/api/movies',moviesRouter )
server.use('/api/ratings', ratingRouter)
server.use('/api/stars', starsRouter)


module.exports = server;
