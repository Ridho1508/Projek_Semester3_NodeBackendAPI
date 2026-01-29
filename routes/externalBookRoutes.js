const express = require("express");
const router = express.Router();

const externalBookController = require("../controllers/externalBookController");

router.get("/books", externalBookController.searchExternalBooks);

module.exports = router;
