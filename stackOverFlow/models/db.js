const mysql = require("mysql2/promise");

const config = require("../config/database");

// Create a connection to the database

// open the MySQL connection

async function query(sql, params) {
  const connection = await mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.db,
  });
  connection.connect((error) => {
    if (error) {
      throw error;
    }
  });

  await connection.query("USE project1");

  console.log("QDqwdwqwqdqwdqw", sql, params);

  const res = await connection.execute(sql, params);

  console.log("rows", res[0]);

  return res[0];
}

module.exports = { query };
