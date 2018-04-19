const mongoose = require('mongoose');
const AbsenceChangeSchema = require('./AbsenceChangeSchema');

const AbsenceSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now() },
  relevant_lessons: [String],
  excused: Boolean,
  persistent_excuse: Boolean,
  reason: String,
  absence_log: [AbsenceChangeSchema],
});


module.exports = AbsenceSchema;
