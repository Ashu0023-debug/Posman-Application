
const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db');


router.get('/', async (req, res, next) => {
  try {
    const pool = getPool(); 
    const [responses] = await pool.query('SELECT * FROM responses');
    res.json({ responses });
  } catch (err) {
    console.error('❌ Responses GET Error:', err);
    next(err); 
  }
});

module.exports = router;
