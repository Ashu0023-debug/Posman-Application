const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

let pool; // MySQL connection pool

// Connect to DB
const connectDB = async () => {
  try {
    if (!pool) {
      pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Patleashish0023@@',
        database: process.env.DB_NAME || 'postman_clone_db',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });

      // Test connection
      const conn = await pool.getConnection();
      console.log('✅ MySQL Connected Successfully!');
      conn.release();
    }
    return pool;
  } catch (err) {
    console.error('❌ DB Connection Error:', err.message);
    throw err;
  }
};

// Get pool instance
const getPool = () => {
  if (!pool) throw new Error('DB not initialized. Call connectDB() first.');
  return pool;
};

module.exports = { connectDB, getPool };
