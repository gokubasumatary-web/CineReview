const { Client } = require('pg');
const connectionString = 'postgresql://neondb_owner:npg_cUpMaEWZf12O@ep-sweet-meadow-ajplabbv-pooler.c-3.us-east-2.aws.neon.tech/neondb?sslmode=require';

const client = new Client({
  connectionString: connectionString,
});

client.connect()
  .then(() => {
    console.log('Connected successfully to NeonDB');
    client.end();
  })
  .catch(err => {
    console.error('Connection error details:', err.message);
    process.exit(1);
  });
