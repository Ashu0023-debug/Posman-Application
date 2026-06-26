const db = require('../config/db');

const Collection = {
  create: (name, workspace_id) => {
    const sql = 'INSERT INTO collections (name, workspace_id) VALUES (?, ?)';
    return db.promise().execute(sql, [name, workspace_id]);
  },

  getAll: (workspace_id) => {
    const sql = 'SELECT * FROM collections WHERE workspace_id = ?';
    return db.promise().execute(sql, [workspace_id]);
  },
};

module.exports = Collection;
