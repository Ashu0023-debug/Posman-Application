const db = require('../config/db');

const Workspace = {
  create: (name, user_id) => {
    const sql = 'INSERT INTO workspaces (name, user_id) VALUES (?, ?)';
    return db.promise().execute(sql, [name, user_id]);
  },

  getAll: (user_id) => {
    const sql = 'SELECT * FROM workspaces WHERE user_id = ?';
    return db.promise().execute(sql, [user_id]);
  },

  delete: (id, user_id) => {
    const sql = 'DELETE FROM workspaces WHERE id = ? AND user_id = ?';
    return db.promise().execute(sql, [id, user_id]);
  },
};

module.exports = Workspace;
