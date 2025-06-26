 const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// ✅ Declare the books array here
let books = [];

// Optional welcome route
app.get('/', (req, res) => {
  res.send("Welcome to the Book API!");
});

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST a new book
app.post('/books', (req, res) => {
  const { id, title, author } = req.body;
  books.push({ id, title, author });
  res.status(201).json({ message: 'Book added successfully!' });
});

// PUT (update) a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const { title, author } = req.body;

  const book = books.find(b => b.id === bookId);
  if (book) {
    book.title = title;
    book.author = author;
    res.json({ message: 'Book updated successfully!' });
  } else {
    res.status(404).json({ message: 'Book not found.' });
  }
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const index = books.findIndex(b => b.id === bookId);
  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: 'Book deleted successfully!' });
  } else {
    res.status(404).json({ message: 'Book not found.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
 

Update index.js to fix double app.listen


