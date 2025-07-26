const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
  });


  router.post('/create',(req, res)=>{
    const {title, text}=req.body;
    // console.log(title, text);
    const fileName = title.split(' ').join('') + '.txt';
    const filePath = path.join(__dirname, '..', 'snippets', fileName);
    
    fs.writeFile(filePath, text, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Server error');
        }
        console.log('File written');
        res.send("File written succesfully");
    });
        
   
  });




  module.exports = router;