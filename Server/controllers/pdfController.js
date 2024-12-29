const { savePDF, getAllPDFs } = require('../services/pdfService');

const uploadPDF = async (req, res) => {
  try {
    const { filename, path: filePath } = req.file;
    const savedPDF = await savePDF(filename, filePath);

    res.status(200).json({ message: 'File uploaded successfully', file: savedPDF });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading file' });
  }
};

const listPDFs = async (req, res) => {
  try {
    const pdfs = await getAllPDFs();
    res.status(200).json({ pdfs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving PDFs' });
  }
};

module.exports = { uploadPDF, listPDFs };
