const mysql = require("mysql");

// pool version (to fix ECONNRESET error located in node_modules/mysql/lib/Connection)
const connection = mysql.createPool({
  connectionLimit: 10,
  database: "ardalanj_switch2zero",
  user: "ardalanj_switch2zero",
  password: "P]QJG3Lgk(1p",
  host: "91.238.163.176",
  port: "3306",
});

// << included enviroment details just for demo >>

function pConnection(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        console.log("SQL rejected request: " + err);
        reject();
      }
      resolve(results);
    });
  });
}
module.exports = pConnection;
