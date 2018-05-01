const mongoose = require('mongoose');
const AbsenceChangeSchema = require('./AbsenceChangeSchema');

const AbsenceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now() },
  relevant_lessons: [String],
  excused: Boolean,
  persistent_excuse: Boolean,
  reason: String,
  absence_log: [AbsenceChangeSchema],
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});


module.exports = AbsenceSchema;
