/**
 * Review Routes
 * Defines endpoints for managing user-generated movie reviews.
 */
const express = require('express');
const { getReviews, createReview } = require('../controllers/reviewController');

const router = express.Router();

// Community review endpoints
router.get('/', getReviews);     // Fetch reviews (filtered by movie or user)
router.post('/', createReview);   // Submit a new review

module.exports = router;
