const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

const createReview = async (req, res) => {
  try {
    const { movieId, userId, content, rating } = req.body;
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
