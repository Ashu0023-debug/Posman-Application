
const express = require('express');
const router = express.Router();
const { getPool } = require('../config/db'); 

router.get('/', async (req, res, next) => {
  try {
    const pool = getPool();
    const [workspaces] = await pool.query('SELECT id, name, created_at FROM workspaces');
    res.json({ workspaces });
  } catch (err) {
    console.error('❌ Workspaces GET Error:', err);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    const pool = getPool();
    const [result] = await pool.query('INSERT INTO workspaces (name) VALUES (?)', [name]);

    res.status(201).json({ message: 'Workspace created', workspaceId: result.insertId });
  } catch (err) {
    console.error('❌ Workspaces POST Error:', err);
    next(err);
  }
});

module.exports = router;
