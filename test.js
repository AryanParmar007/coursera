const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Sample data for books (replace it with actual API calls or database operations)
const books = [
  { ISBN: '123456', title: 'Book1', author: 'Author1', review: 'Good book' },
  { ISBN: '789012', title: 'Book2', author: 'Author2', review: 'Excellent read' },
  // Add more books as needed
];

// Task 1: Get the book list available in the shop
app.get('/books', (req, res) => {
  res.json(books);
});

// Task 2: Get the books based on ISBN
app.get('/books/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const book = books.find((b) => b.ISBN === isbn);

  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});

// Task 3: Get all books by Author
app.get('/books/author/:author', (req, res) => {
  const author = req.params.author;
  const booksByAuthor = books.filter((b) => b.author === author);

  res.json(booksByAuthor);
});

// Task 4: Get all books based on Title
app.get('/books/title/:title', (req, res) => {
  const title = req.params.title;
  const booksByTitle = books.filter((b) => b.title === title);

  res.json(booksByTitle);
});

// Task 5: Get book Review
app.get('/books/review/:isbn', async (req, res) => {
  const isbn = req.params.isbn;

  try {
    const response = await axios.get(`API_ENDPOINT/reviews/${isbn}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching book review:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Task 10: Get all books - Using async callback function
app.get('/async/books', async (req, res) => {
  try {
    const response = await axios.get('API_ENDPOINT/books'); // Replace 'API_ENDPOINT' with your actual API endpoint
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching all books:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Task 11: Search by ISBN - Using Promises
app.get('/promise/books/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  axios
    .get(`API_ENDPOINT/books/${isbn}`)
    .then((response) => res.json(response.data))
    .catch((error) => {
      console.error(`Error searching by ISBN (${isbn}):`, error.message);
      res.status(500).send('Internal Server Error');
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
