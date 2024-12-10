const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadPDF, listPDFs } = require('../controllers/pdfController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});
const upload = multer({ storage });

// Routes
router.post('/upload', upload.single('pdf'), uploadPDF);
router.get('/list', listPDFs);

module.exports = router;
