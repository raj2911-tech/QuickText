const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('index');

});

router.post('/create', (req, res) => {
  const { title, text } = req.body;
  // console.log(title, text);
  const fileName = title.split(' ').join('') + '.txt';
  const filePath = path.join(__dirname, '..', 'snippets', fileName);

  fs.writeFile(filePath, text, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).send('Server error');
    }
    console.log('File written');
    res.render('success', { fileUrl: `http://localhost:3000/${fileName.slice(0, -4)}` });
  });
});

router.get('/404', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/404.html'));
});

router.get('/:filename', (req, res) => {
  const filename = req.params.filename + '.txt';
  const filePath = path.join(__dirname, '..', 'snippets', filename);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err || !data) {
      console.error('File not found', err);
      return res.status(404).render('404');

    }
    console.log('File content:', data);
    // res.send(`<pre>${data}</pre>`);
    res.render('view', {
      filename: req.params.filename,
      content: data
    });
  });
});


module.exports = router;