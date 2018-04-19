 const mongoose = require('mongoose');
module.exports = mongoose.model('Rank', new mongoose.Schema({
    name: String,
    Permissions_Level: Integer,

}));

