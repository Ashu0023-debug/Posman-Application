
const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db');

router.get('/', async (req, res, next) => {
  try {
    const pool = getPool();
    const [requests] = await pool.query('SELECT * FROM requests');
    res.json({ requests });
  } catch (err) {
    console.error('❌ Requests GET Error:', err);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, collection_id, url } = req.body;
    if (!name || !collection_id || !url) {
      return res.status(400).json({ error: 'name, collection_id, and url are required' });
    }

    const pool = getPool();

    const [collection] = await pool.query('SELECT * FROM collections WHERE id = ?', [collection_id]);
    if (collection.length === 0) return res.status(400).json({ error: 'Invalid collection_id' });

   
    const [result] = await pool.query(
      'INSERT INTO requests (name, collection_id, url) VALUES (?, ?, ?)',
      [name, collection_id, url]
    );

    res.status(201).json({ message: 'Request created', requestId: result.insertId });
  } catch (err) {
    console.error('❌ Requests POST Error:', err);
    next(err);
  }
});

module.exports = router;
