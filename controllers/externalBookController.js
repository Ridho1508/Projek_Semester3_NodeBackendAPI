const axios = require("axios");

exports.searchExternalBooks = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        message: "Query pencarian wajib diisi",
      });
    }

    const response = await axios.get(
      "https://openlibrary.org/search.json",
      {
        params: { q },
      }
    );

    const books = response.data.docs.slice(0, 10).map((book) => ({
      title: book.title || "Tanpa Judul",
      author: book.author_name?.[0] || "Unknown",
      year: book.first_publish_year || null,
      isbn: book.isbn?.[0] || "N/A",
    }));

    res.status(200).json({
      source: "Open Library API",
      total: books.length,
      data: books,
    });
  } catch (error) {
    console.error("Error External API:", error.message);
    res.status(500).json({
      message: "Gagal mengambil data dari API publik",
    });
  }
};
