const mysql = require("mysql2/promise");
const config = require("../config/database");

async function createConnection() {
  const connection = await mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.db,
  });

  return connection;
}

async function getConnection() {
  connection = await createConnection();

  connection.connect((error) => {
    if (error) {
      throw error;
    }
  });

  return connection;
}

async function query(sql, params) {
  const connection = await getConnection();

  await connection.query("USE stackOverFlow");

  const res = await connection.execute(sql, params);

  return res[0];
}

module.exports = { query };
