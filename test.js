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

// Sample data for registered users (replace it with actual user authentication logic)
const registeredUsers = [
  { username: 'user1', password: 'pass1' },
  { username: 'user2', password: 'pass2' },
  // Add more users as needed
];

let currentUser = null;

// Task 6: Register New user
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already taken
  if (registeredUsers.some((user) => user.username === username)) {
    return res.status(400).send('Username already exists');
  }

  // Add the new user
  registeredUsers.push({ username, password });
  res.send('User registered successfully');
});

// Task 7: Login as a Registered user
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password match
  const user = registeredUsers.find((u) => u.username === username && u.password === password);

  if (user) {
    currentUser = user;
    res.send('Login successful');
  } else {
    res.status(401).send('Invalid username or password');
  }
});

// Task 8: Add/Modify a book review (for registered users)
app.post('/reviews', (req, res) => {
  if (!currentUser) {
    return res.status(401).send('Unauthorized');
  }

  const { isbn, review } = req.body;

  // Find the book by ISBN
  const book = books.find((b) => b.ISBN === isbn);

  if (!book) {
    return res.status(404).send('Book not found');
  }

  // Add or modify the review
  book.review = review;
  res.send('Review added/modified successfully');
});

// Task 9: Delete book review added by that particular user (for registered users)
app.delete('/reviews/:isbn', (req, res) => {
  if (!currentUser) {
    return res.status(401).send('Unauthorized');
  }

  const isbn = req.params.isbn;

  // Find the book by ISBN
  const book = books.find((b) => b.ISBN === isbn);

  if (!book) {
    return res.status(404).send('Book not found');
  }

  // Check if the current user has added a review for this book
  if (book.review && book.review.length > 0) {
    // Delete the review
    book.review = null;
    res.send('Review deleted successfully');
  } else {
    res.status(404).send('Review not found');
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


