const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  fileName: String,
  filePath: String,
});

const PDF = mongoose.model('PDF', pdfSchema);

module.exports = PDF;
