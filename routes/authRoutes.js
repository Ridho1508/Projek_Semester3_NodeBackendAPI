const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);

// ROUTE PROTECTED (TES)
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Akses berhasil",
    user: req.user,
  });
});

module.exports = router;
