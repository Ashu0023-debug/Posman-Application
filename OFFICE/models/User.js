const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  register: async (name, email, password) => {
    const hashed = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    return db.promise().execute(sql, [name, email, hashed]);
  },

  findByEmail: (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    return db.promise().execute(sql, [email]);
  },
};

module.exports = User;
