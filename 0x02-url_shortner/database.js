const sqlite3 = require("sqlite3").verbose();

let sql;

const db = new sqlite3.Database("./urls.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

sql = `CREATE TABLE IF NOT EXISTS urls(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  short_url TEXT UNIQUE,
  original_url TEXT NOT NULL
)`;

db.serialize(() => {
  db.run(sql);
});

// Promisify db.get and db.run for async/await usage
const { promisify } = require("util");
db.get = promisify(db.get.bind(db));
db.run = function (sql, params) {
  return new Promise((resolve, reject) => {
    this.__proto__.run.call(this, sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

module.exports = db;
