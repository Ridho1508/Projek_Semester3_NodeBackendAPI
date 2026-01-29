const db = require("../config/database");

exports.getAllUsers = (req, res) => {
  db.query("SELECT id, name, email, role FROM users", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT id, name, email, role FROM users WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0)
        return res.status(404).json({ message: "User not found" });
      res.json(result[0]);
    }
  );
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  db.query(
    "UPDATE users SET name=?, email=?, role=? WHERE id=?",
    [name, email, role, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User updated" });
    }
  );
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User deleted" });
  });
};
