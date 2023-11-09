import pg from 'pg';

const { Pool } = pg;

console.log('iniciando pool: ' + process.env.POSTGRES_URL);
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;