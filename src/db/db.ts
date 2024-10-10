import { Pool } from 'pg';
import Redis from 'redis';

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
  });

const redisClient = Redis.createClient();

pool.on('error', (err) => {
  console.error('Postgres Pool Error', err);
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

export { pool, redisClient };
