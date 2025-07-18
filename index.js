const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();

const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// 👇 THIS is the core API route
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

module.exports = app;
