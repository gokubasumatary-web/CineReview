/**
 * Watchlist Routes
 * Defines endpoints for managing user personal movie collections.
 */
const express = require('express');
const { getWatchlist, addToWatchlist, removeFromWatchlist } = require('../controllers/watchlistController');

const router = express.Router();

/**
 * @route GET /api/watchlist
 * @desc Retrieve a user's watchlist
 */
router.get('/', getWatchlist);

/**
 * @route POST /api/watchlist/add
 * @desc Add a movie to a user's watchlist
 */
router.post('/add', addToWatchlist);

/**
 * @route POST /api/watchlist/remove
 * @desc Remove a movie from a user's watchlist
 */
router.post('/remove', removeFromWatchlist);

module.exports = router;
