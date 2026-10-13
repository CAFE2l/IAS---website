import { Pool } from 'pg';

// Database connection for Neon PostgreSQL
// This uses the DATABASE_URL from environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Query helper function
export async function query<T = any>(
  text: string,
  params?: (string | number | boolean | null)[]
): Promise<{ rows: T[]; rowCount: number }> {
  const start = Date.now();
  const res = await pool.query<T>(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: res.rowCount });
  return res;
}

// Get a single row
export async function queryOne<T = any>(
  text: string,
  params?: (string | number | boolean | null)[]
): Promise<T | null> {
  const res = await pool.query<T>(text, params);
  return res.rows[0] || null;
}

// Get multiple rows
export async function queryAll<T = any>(
  text: string,
  params?: (string | number | boolean | null)[]
): Promise<T[]> {
  const res = await pool.query<T>(text, params);
  return res.rows;
}

// Pool for external use
export { pool };

// Graceful shutdown
process.on('exit', () => {
  pool.end(() => {
    console.log('Pool has ended');
  });
});