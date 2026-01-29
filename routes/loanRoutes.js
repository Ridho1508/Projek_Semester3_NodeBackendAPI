const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const loanController = require("../controllers/loanController");

router.post("/", auth, loanController.createLoan);
router.get("/", auth, loanController.getAllLoans);
router.put("/:id/return", auth, loanController.returnBook);
router.get("/user/:id", auth, loanController.getLoansByUser);

module.exports = router;
