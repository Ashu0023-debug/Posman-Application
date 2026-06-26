const db = require('../config/db');

const Request = {
  create: (name, method, url, collection_id) => {
    const sql = 'INSERT INTO requests (name, method, url, collection_id) VALUES (?, ?, ?, ?)';
    return db.promise().execute(sql, [name, method, url, collection_id]);
  },

  getAll: (collection_id) => {
    const sql = 'SELECT * FROM requests WHERE collection_id = ?';
    return db.promise().execute(sql, [collection_id]);
  },
};

module.exports = Request;
