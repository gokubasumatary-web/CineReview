const express = require('express');
const { getTrending, getDetails, search } = require('../controllers/movieController');

const router = express.Router();

router.get('/trending', getTrending);
router.get('/search', search);
router.get('/:id', getDetails);

module.exports = router;
