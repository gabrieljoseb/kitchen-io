import pg from 'pg';

const { Pool } = pg;

console.log('iniciando pool');
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})
console.log('pool iniciada');

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;