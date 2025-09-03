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

module.exports = db;
