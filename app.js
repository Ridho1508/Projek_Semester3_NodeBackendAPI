const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const loanRoutes = require("./routes/loanRoutes");
const externalBookRoutes = require("./routes/externalBookRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/external-books", externalBookRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "API Perpustakaan Online berjalan 🚀",
  });
});

module.exports = app;
