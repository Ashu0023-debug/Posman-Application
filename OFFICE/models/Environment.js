const db = require('../config/db');

const Environment = {
  create: (name, variables, user_id) => {
    const sql = 'INSERT INTO environments (name, variables, user_id) VALUES (?, ?, ?)';
    return db.promise().execute(sql, [name, JSON.stringify(variables), user_id]);
  },

  getAll: (user_id) => {
    const sql = 'SELECT * FROM environments WHERE user_id = ?';
    return db.promise().execute(sql, [user_id]);
  },
};

module.exports = Environment;
