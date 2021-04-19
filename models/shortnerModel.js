const mongoose = require('mongoose');

// instantiate a mongoose schema
const shortnerSchema = new mongoose.Schema({
  urlCode: String,
  initialUrl: {
    type: String,
    required: true,
  },
  shortUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// create a model from schema and export it
module.exports = mongoose.model('shortner', shortnerSchema);
