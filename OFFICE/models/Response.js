const db = require('../config/db');

const Response = {
  create: (status, body, request_id) => {
    const sql = 'INSERT INTO responses (status, body, request_id) VALUES (?, ?, ?)';
    return db.promise().execute(sql, [status, body, request_id]);
  },

  getByRequest: (request_id) => {
    const sql = 'SELECT * FROM responses WHERE request_id = ?';
    return db.promise().execute(sql, [request_id]);
  },
};

module.exports = Response;
