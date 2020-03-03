const Sequelize = require("sequelize");

// Option 1: Passing parameters separately
const sequelizeConnection = new Sequelize("node-sql", "root", "password", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelizeConnection;

// MySQL connection:
// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: 'nodecomplete'
// });

// module.exports = pool.promise();
