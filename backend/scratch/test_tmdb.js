const axios = require('axios');
require('dotenv').config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

async function testTMDB() {
  console.log('Testing with API Key:', TMDB_API_KEY);
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
      params: { api_key: TMDB_API_KEY }
    });
    console.log('Successfully fetched movies!');
    console.log('Count:', response.data.results.length);
    console.log('First Movie:', response.data.results[0].title);
  } catch (error) {
    console.error('TMDB Fetch Failed!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testTMDB();
