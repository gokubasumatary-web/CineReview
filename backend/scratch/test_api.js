const http = require('http');

http.get('http://localhost:5000/api/movies/trending', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('Response Count:', json.length);
      console.log('First Movie Title:', json[0].title);
    } catch (e) {
      console.error('Failed to parse JSON:', data);
    }
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
