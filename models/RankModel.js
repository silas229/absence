const mongoose = require('mongoose');

module.exports = mongoose.model('Rank', new mongoose.Schema({
  name: String,
  permissions_level: Integer,
}));

