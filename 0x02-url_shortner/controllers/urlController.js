const { nanoid } = require("nanoid");

const db = require("../database");

const PORT = process.env.PORT || 8080;

exports.shortenUrl = async (req, res) => {
  const { original_url } = req.body;
  let short_url;

  row = await db.get(
    "SELECT * FROM urls WHERE original_url = ?",
    [original_url]
  );

  if (row && row.short_url)
    return res.json({ shortUrl: `http://localhost:${PORT}/${row.short_url}` });

  let exists = true;
  while (exists) {
    short_url = nanoid(6);
    let row = await db.get("SELECT * FROM urls WHERE short_url = ?", [short_url]);
    exists = !!row;
  }
  await db.run("INSERT INTO urls(short_url, original_url) VALUES(?, ?)", [
    short_url,
    original_url,
  ]);
  res.json({ shortUrl: `http://localhost:${PORT}/${short_url}` });
};
