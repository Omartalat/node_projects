const express = require("express");
const app = express();
const router = require("./routes/urlRoutes");
const PORT = 8080;

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
