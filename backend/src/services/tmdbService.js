require('dotenv').config();
const axios = require('axios');

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Use a function to get the key to ensure it's always up to date
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

const getTrendingMovies = async () => {
  const response = await tmdb.get('/trending/movie/week');
  return response.data.results;
};

const getMovieDetails = async (movieId) => {
  const response = await tmdb.get(`/movie/${movieId}`, {
    params: {
      append_to_response: 'credits,videos,reviews',
    },
  });
  return response.data;
};

const searchMovies = async (query) => {
  const response = await tmdb.get('/search/movie', {
    params: {
      query,
    },
  });
  return response.data.results;
};

module.exports = {
  getTrendingMovies,
  getMovieDetails,
  searchMovies,
};
