const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle incoming data and file from the client
app.post('/upload-file', upload.single('file'), (req, res) => {
  const inputData = req.body.inputData;
  const uploadedFile = req.file;
  
  console.log('Received input from client:', inputData);
  console.log('Received file:', uploadedFile);

  // Perform any server-side logic here...

  // Send a response back to the client
  res.json({ message: 'Server received input and file successfully.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
