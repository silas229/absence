const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  rank: String,
  grade: String,
  reauth: Boolean,
});

UserSchema.pre('save', async function saveHook(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  user.password = await bcrypt.hash(user.password, 5);
  return next();
});

module.exports = UserSchema;

