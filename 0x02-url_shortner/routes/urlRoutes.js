const router = require("express").Router();

const urlController = require("../controllers/urlController");

router.post("/shorten", urlController.shortenUrl);

module.exports = router;
