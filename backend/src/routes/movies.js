/**
 * Movie Routes
 * Defines endpoints for discovering and retrieving movie data.
 */
const express = require('express');
const { getTrending, getDetails, search } = require('../controllers/movieController');

const router = express.Router();

// Movie discovery endpoints
router.get('/trending', getTrending); // Get weekly trending list
router.get('/search', search);       // Search by title
router.get('/:id', getDetails);      // Get full details + AI insights

module.exports = router;
