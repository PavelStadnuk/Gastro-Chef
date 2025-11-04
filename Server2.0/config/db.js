import { createPool } from 'mysql2/promise';

const db = createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'project2_0',
  charset: 'utf8mb4',
});

async function checkConnection() {
  try {
    const conn = await db.getConnection();
    console.log('✅ Connected to MySQL');
    conn.release();
  } catch (err) {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  }
}

checkConnection();

export default db
