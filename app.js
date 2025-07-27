const express = require('express');
const path = require('path');
const app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'favicon.ico')));

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Route handlers
const snippetRoutes = require('./routes/snippet');
app.use('/', snippetRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
