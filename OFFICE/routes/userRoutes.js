const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db');

router.get('/', async (req, res, next) => {
  try {
    const pool = getPool();
    const [users] = await pool.query('SELECT id, name, email, created_at FROM users');
    res.json({ users });
  } catch (err) {
    console.error('❌ Users GET Error:', err);
    next(err);
  }
});

module.exports = router;
