const mysql = require("mysql2");

const pool = mysql.createPool({
  database: "user-manager",
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});

module.exports = pool.promise();
