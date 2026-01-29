const db = require("../config/database");

exports.getAllBooks = (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.createBook = (req, res) => {
  const { title, author, year, stock, category_id } = req.body;
  const sql = "INSERT INTO books VALUES (NULL,?,?,?,?,NOW())";
  db.query(sql, [title, author, year, stock, category_id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Book added" });
  });
};
