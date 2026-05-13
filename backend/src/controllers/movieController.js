/**
 * Movie Controller
 * Handles movie discovery, details, and AI-powered insights.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const tmdbService = require('../services/tmdbService');
const aiService = require('../services/aiService');

/**
 * Fetches trending movies from TMDB.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getTrending = async (req, res) => {
  try {
    const movies = await tmdbService.getTrendingMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch trending movies', error: error.message });
  }
};

/**
 * Fetches comprehensive movie details, including AI insights and community reviews.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await tmdbService.getMovieDetails(id);
    
    // Fetch Community Reviews from our database
    const communityReviews = await prisma.review.findMany({
      where: { movieId: id },
      include: {
        user: {
          select: { name: true, avatar: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Synthesize AI Insight
    const aiInsight = await aiService.synthesizeMovieInsight(movie);
    
    res.json({
      ...movie,
      aiInsight,
      communityReviews
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movie details', error: error.message });
  }
};

/**
 * Searches for movies by title using TMDB.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const search = async (req, res) => {
  try {
    const { q } = req.query;
    const movies = await tmdbService.searchMovies(q);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search movies', error: error.message });
  }
};

module.exports = {
  getTrending,
  getDetails,
  search,
};
