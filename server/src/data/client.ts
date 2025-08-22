import * as pg from 'pg';
const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.PG_URL });

export { pool };
