const express = require('express');
const { getWatchlist, addToWatchlist, removeFromWatchlist } = require('../controllers/watchlistController');

const router = express.Router();

router.get('/', getWatchlist);
router.post('/add', addToWatchlist);
router.post('/remove', removeFromWatchlist);

module.exports = router;
