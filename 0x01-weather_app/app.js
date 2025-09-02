const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config();

app.use(express.json());

app.get("/weather", (req, res) => {
  const city = req.query.city;
  if (!city)
    return res
      .status(400)
      .send("Bad Request: city query parameter is required");

  axios
    .get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.OPENWEATHER_API_KEY}&q=${city}`
    )
    .then((weather) => res.json(weather.data))
    .catch((err) => {
      console.error("Error: ", err.response ? err.response.data : err.message);
      res.status(500).json({
        error: "Internal Server Error",
        details: err.response ? err.response.data : err.message,
      });
    });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
