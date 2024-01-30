const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up the storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original filename
    }
  });
  
const upload = multer({ storage: storage });

// Endpoint for uploading images
app.post('/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image provided' });
        }

        // You can save additional information about the image in a database if needed

        res.status(201).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for retrieving images
app.get('/gallery', (req, res) => {
    try {
        const files = fs.readdirSync('uploads');
        res.json({ images: files });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/image/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);
  
    try {
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Image not found' });
      }
  
      // Set the appropriate content type for the image
      res.setHeader('Content-Type', 'image/jpeg'); // Adjust based on image type
  
      // Send the image file
      res.sendFile(filePath);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// Endpoint for deleting images
app.delete('/image/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);

    try {
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Image not found' });
        }

        fs.unlinkSync(filePath);
        res.json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust path as needed
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});