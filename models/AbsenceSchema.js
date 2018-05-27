const mongoose = require('mongoose');
const AbsenceChangeSchema = require('./AbsenceChangeSchema');
const objectHash = require('object-hash');
const mongooseToCsv = require('mongoose-to-csv');

const AbsenceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now() },
  relevant_lessons: [String],
  excused: Boolean,
  persistent_excuse: Boolean,
  reason: String,
  absence_log: [AbsenceChangeSchema],
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // creator
  integrity: Boolean,
});

AbsenceSchema.pre('save', (next) => {
  const AbsenceLog = this.absence_log;
  for (let i = 0; i < AbsenceLog.length; i += 1) {
    if (!objectHash(AbsenceLog[i - 1]) === AbsenceLog[i].previous_change) {
      this.integrity = false;
      return next();
    }
  }
});


AbsenceSchema.plugin(mongooseToCsv, {
  headers: 'Zeit betreffendeStunden entschuldigt? schr._entschuldigt? Grund Veranderungen korrupterDatensatz',
  delimiter: process.env.CSV_DELIMITER,
  constraints: {
    betreffendeStunden: 'relevenat_lessons',
    Grund: 'reason',
    korrupterDatensatz: 'integrity',
  },
  virtuals: {
    Time: doc => (new Date(doc.timestamp)).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    'entschuldigt?': doc => (doc.excused ? 'ja' : 'nein'),
    'schr._entschuldigt?': doc => (doc.persistent_excuse ? 'ja' : 'nein'),
    Veranderungen: doc => doc.absence_log.map(a => `zeit: ${a.timestamp} zielwert: ${a.target_field} alterWert: ${a.old_value}, neuerWert: ${a.new_value}`)
  },
});

module.exports = AbsenceSchema;
