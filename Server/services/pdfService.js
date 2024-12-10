const PDF = require('../db/models/pdfModel');

const savePDF = async (fileName, filePath) => {
  const newPdf = new PDF({ fileName, filePath });
  return await newPdf.save();
};

const getAllPDFs = async () => {
  return await PDF.find();
};

module.exports = { savePDF, getAllPDFs };
