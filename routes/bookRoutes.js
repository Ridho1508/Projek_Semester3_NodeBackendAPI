const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const bookController = require("../controllers/bookController");

router.get("/", auth, bookController.getAllBooks);
router.post("/", auth, bookController.createBook);

module.exports = router;
