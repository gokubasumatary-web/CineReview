/**
 * TMDB Service
 * Handles all communication with The Movie Database (TMDB) API.
 * Uses an axios interceptor to automatically inject the API key into all requests.
 */
require('dotenv').config();
const axios = require('axios');

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Utility to fetch the API key from environment variables
const getApiKey = () => process.env.TMDB_API_KEY;

const tmdb = axios.create({
  baseURL: TMDB_BASE_URL,
});

// Interceptor to add api_key to every request
tmdb.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params.api_key = getApiKey();
  return config;
});

/**
 * Fetches the currently trending movies for the week.
 * @returns {Promise<Array>} List of trending movie objects.
 */
const getTrendingMovies = async () => {
  const response = await tmdb.get('/trending/movie/week');
  return response.data.results;
};

/**
 * Fetches detailed information for a specific movie, including credits and trailers.
 * @param {string} movieId - The TMDB movie ID.
 * @returns {Promise<Object>} Detailed movie data.
 */
const getMovieDetails = async (movieId) => {
  const response = await tmdb.get(`/movie/${movieId}`, {
    params: {
      append_to_response: 'credits,videos,reviews',
    },
  });
  return response.data;
};

/**
 * Searches for movies by title query.
 * Handles pagination and empty results gracefully.
 * @param {string} query - The search string.
 * @returns {Promise<Array>} List of matching movie objects or empty array on failure.
 */
const searchMovies = async (query) => {
  try {
    const response = await tmdb.get('/search/movie', {
      params: {
        query,
      },
    });
    return response.data.results || [];
  } catch (error) {
    console.error('TMDB Search Error:', error.message);
    return [];
  }
};

module.exports = {
  getTrendingMovies,
  getMovieDetails,
  searchMovies,
};
