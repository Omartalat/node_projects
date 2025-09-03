const PORT = process.env.PORT || 8080;
const { nanoid } = require("nanoid");

const db = require("../database");

exports.shortenUrl = async (req, res) => {
  try {
    const { original_url } = req.body;
    let short_url;

    // Check if URL already exists
    let row = await db.get("SELECT * FROM urls WHERE original_url = ?", [
      original_url,
    ]);

    if (row && row.short_url) {
      return res.json({
        shortUrl: `http://localhost:8080/${row.short_url}`,
      });
    }

    // Generate unique short_url
    let exists = true;
    while (exists) {
      short_url = nanoid(6);
      let row2 = await db.get("SELECT * FROM urls WHERE short_url = ?", [
        short_url,
      ]);
      exists = !!row2;
    }

    await db.run("INSERT INTO urls(short_url, original_url) VALUES(?, ?)", [
      short_url,
      original_url,
    ]);
    res.json({ shortUrl: `http://localhost:${PORT}/${short_url}` });
  } catch (err) {
    console.error("Error in shortenUrl:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
