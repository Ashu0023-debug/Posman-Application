
const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db');

router.get('/', async (req, res, next) => {
  try {
    const pool = getPool();
    const [environments] = await pool.query('SELECT * FROM environments');
    res.json({ environments });
  } catch (err) {
    console.error('❌ Environments GET Error:', err);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const pool = getPool();
    const [result] = await pool.query(
      'INSERT INTO environments (name) VALUES (?)',
      [name]
    );

    res.status(201).json({ message: 'Environment created', environmentId: result.insertId });
  } catch (err) {
    console.error('❌ Environments POST Error:', err);
    next(err);
  }
});

module.exports = router;