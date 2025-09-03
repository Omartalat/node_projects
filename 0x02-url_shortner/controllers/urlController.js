const { nanoid } = require("nanoid");

const db = require("../database");

const PORT = 8080;

exports.shortenUrl = (req, res) => {
  const { original_url } = req.body;
  const short_url = nanoid(6);

  db.run(
    "INSERT INTO urls(short_url, original_url) VALUES(?, ?)",
    [short_url, original_url],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Database error", details: err.message });
      }
      res.json({ shortUrl: `http://localhost:${PORT}/${short_url}` });
    }
  );
};
