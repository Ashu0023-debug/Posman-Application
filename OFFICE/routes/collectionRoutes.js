const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db');

router.get('/', async (req, res, next) => {
  try {
    const pool = getPool();
    const [collections] = await pool.query('SELECT id, name, workspace_id, created_at FROM collections');
    res.json({ collections });
  } catch (err) {
    console.error('❌ Collections GET Error:', err);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, workspace_id } = req.body;
    if (!name || !workspace_id) {
      return res.status(400).json({ error: 'Both name and workspace_id are required' });
    }

    const pool = getPool();

    const [workspace] = await pool.query('SELECT id FROM workspaces WHERE id = ?', [workspace_id]);
    if (workspace.length === 0) {
      return res.status(400).json({ error: 'Invalid workspace_id' });
    }

    const [result] = await pool.query(
      'INSERT INTO collections (name, workspace_id) VALUES (?, ?)',
      [name, workspace_id]
    );

    res.status(201).json({ message: 'Collection created', collectionId: result.insertId });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
