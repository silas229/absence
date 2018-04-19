const mongoose = require('mongoose');

const AbsenceChangeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
  action_type: String,
  old_value: String,
  new_value: String,
});

/*
To Save:

var r = new Recipe();

r.name = 'Blah';
r.ingredients.push('mongo id of ingredient');

r.save();
 */
module.exports = AbsenceChangeSchema;
