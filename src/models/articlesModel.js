const mysql = require('mysql2/promise');
const dbConfigObj = require('../dbConfig');

async function getAllArticles() {
  try {
    const sql = 'SELECT * FROM articles';
    const connection = await mysql.createConnection(dbConfigObj);
    const [allArticles] = await connection.query(sql);
    connection.close();
    return allArticles;
  } catch (error) {
    console.log('getAllArticles', error);
    return false;
  }
}

module.exports = getAllArticles;
