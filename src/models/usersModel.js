const mysql = require('mysql2/promise');
const dbConfigObj = require('../dbConfig');

async function registerUserToDb(email, password) {
  try {
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const connection = await mysql.createConnection(dbConfigObj);
    const addedUser = await connection.execute(sql, [email, password]);
    await connection.close();
    return addedUser;
  } catch (error) {
    console.log('registerUserToDb', error);
    return false;
  }
}

async function loginUserToDb(email) {
  try {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const connection = await mysql.createConnection(dbConfigObj);
    const [foundUser] = await connection.execute(sql, [email]);
    await connection.close();
    return foundUser;
  } catch (error) {
    console.log('loginUserToDb', error);
    return false;
  }
}

module.exports = { registerUserToDb, loginUserToDb };
