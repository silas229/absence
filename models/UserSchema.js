const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongooseToCsv = require('mongoose-to-csv');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  rank: { type: mongoose.Schema.Types.ObjectId, ref: 'Rank' },
  grade: String,
  reauth: Boolean,
});

UserSchema.pre('save', async () => {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

UserSchema.plugin(mongooseToCsv, {
  headers: 'Name Email Stufe',
  delimiter: process.env.CSV_DELIMITER,
  constraints: {
    Email: 'email',
    Stufe: 'grade',
    Name: 'name',
  },
});

module.exports = UserSchema;

