const db = require("../config/database");

exports.createLoan = (req, res) => {
  const { user_id, book_id, loan_date, return_date } = req.body;

  const sql =
    "INSERT INTO loans (user_id, book_id, loan_date, return_date) VALUES (?,?,?,?)";

  db.query(sql, [user_id, book_id, loan_date, return_date], (err) => {
    if (err) return res.status(500).json(err);

    // kurangi stok buku
    db.query(
      "UPDATE books SET stock = stock - 1 WHERE id = ?",
      [book_id]
    );

    res.json({ message: "Book loaned successfully" });
  });
};

exports.getAllLoans = (req, res) => {
  const sql = `
    SELECT loans.id, users.name, books.title, loans.loan_date, loans.return_date, loans.status
    FROM loans
    JOIN users ON loans.user_id = users.id
    JOIN books ON loans.book_id = books.id
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.returnBook = (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE loans SET status='returned' WHERE id=?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      // tambah stok buku
      db.query(
        "UPDATE books SET stock = stock + 1 WHERE id = (SELECT book_id FROM loans WHERE id=?)",
        [id]
      );

      res.json({ message: "Book returned" });
    }
  );
};

exports.getLoansByUser = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT books.title, loans.loan_date, loans.return_date, loans.status
    FROM loans
    JOIN books ON loans.book_id = books.id
    WHERE loans.user_id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
