const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('index');
});

// Create a new snippet
router.post('/create', (req, res) => {
  const { title, text } = req.body;

  if (!title || !text) {
    return res.status(400).send('Title and text are required.');
  }

  const fileName = title.trim().split(' ').join('') + '.txt';
  const filePath = path.join(__dirname, '..', 'snippets', fileName);

  fs.writeFile(filePath, text, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).send('Server error');
    }

    res.render('success', {
      fileUrl: `http://localhost:3000/${fileName.replace('.txt', '')}`
    });
  });
});

// View a snippet
router.get('/:filename', (req, res) => {
  const fileName = req.params.filename + '.txt';
  const filePath = path.join(__dirname, '..', 'snippets', fileName);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err || !data) {
      console.warn(`File not found: ${fileName}`);
      return res.status(404).render('404');
    }

    res.render('view', {
      filename: req.params.filename,
      content: data
    });
  });
});

// Edit a snippet (form page)
router.get('/:filename/edit', (req, res) => {
  const fileName = req.params.filename + '.txt';
  const filePath = path.join(__dirname, '..', 'snippets', fileName);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err || !data) {
      console.warn(`Error reading file for edit: ${fileName}`);
      return res.status(404).render('404');
    }

    res.render('edit', {
      filename: req.params.filename,
      content: data
    });
  });
});

// Update a snippet
router.post('/:filename/update', (req, res) => {
  const fileName = req.params.filename + '.txt';
  const filePath = path.join(__dirname, '..', 'snippets', fileName);
  const newText = req.body.text;

  fs.writeFile(filePath, newText, (err) => {
    if (err) {
      console.error('Error updating file:', err);
      return res.status(500).send('Failed to update file');
    }

    res.redirect('/' + req.params.filename);
  });
});

// Delete a snippet
router.post('/:filename/delete', (req, res) => {
  const fileName = req.params.filename + '.txt';
  const filePath = path.join(__dirname, '..', 'snippets', fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      return res.status(500).send('Error deleting file');
    }

    res.redirect('/');
  });
});



module.exports = router;
