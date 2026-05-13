/**
 * Review Controller
 * Manages user-generated movie reviews.
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Fetches reviews for a specific movie or user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getReviews = async (req, res) => {
  try {
    const { movieId, userId } = req.query;
    const filter = {};
    if (movieId) filter.movieId = movieId;
    if (userId) filter.userId = userId;

    const reviews = await prisma.review.findMany({
      where: filter,
      include: {
        user: {
          select: { name: true, avatar: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
};

/**
 * Creates a new movie review in the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const createReview = async (req, res) => {
  try {
    const { movieId, userId, content, rating } = req.body;

    if (!movieId || !userId || !content || rating === undefined) {
      return res.status(400).json({ message: 'All review fields are required' });
    }

    if (rating < 1 || rating > 10) {
      return res.status(400).json({ message: 'Rating must be between 1 and 10' });
    }
    const review = await prisma.review.create({
      data: {
        movieId,
        userId,
        content,
        rating: parseFloat(rating)
      }
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create review', error: error.message });
  }
};

module.exports = { getReviews, createReview };
