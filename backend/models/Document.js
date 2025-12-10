
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocSchema = new Schema({
  originalName: String,
  path: String,
  text: String,
  mime: String,
  uploadedAt: Date
});
module.exports = mongoose.model('Document', DocSchema);
