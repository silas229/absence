const mongoose = require('mongoose');

const AbsenceChangeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
  target_field: String,
  old_value: String,
  new_value: String,
  previous_change: String,
});

module.exports = AbsenceChangeSchema;
