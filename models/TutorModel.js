// Array with matching Absences

const mongoose = require('mongoose');
const AbsenceSchema = require('./AbsenceSchema');

module.exports = mongoose.model('Tutor', new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  absences: [AbsenceSchema],
  rank: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor' },
}));
