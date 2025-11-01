import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/inventory_db',
});

export const db = drizzle(pool, { schema });

export async function initializeDatabase() {
  try {
    const client = await pool.connect();
    console.log('✓ Conectado ao banco de dados');
    client.release();
  } catch (error) {
    console.error('✗ Erro ao conectar ao banco de dados:', error);
    throw error;
  }
}
