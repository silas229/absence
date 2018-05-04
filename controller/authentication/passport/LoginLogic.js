/* eslint-disable consistent-return,no-underscore-dangle */
const jwt = require('jsonwebtoken');
const PassportLocal = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('mongoose').model('User');

function wrong() {
  const error = new Error('Incorrect Credentials');
  error.name = 'IncorrectCredentialsError';
  return error;
}

module.exports = new PassportLocal({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, async (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password,
  };
  try {
    const user = await User.findOne({ email: userData.email });

    if (!user) {
      return done(wrong());
    }

    const passwordAttempt = userData.password;
    const pw = user.password;
    if (await bcrypt.compare(passwordAttempt, pw)) {
      const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '168h' });
      return done(null, token, { name: user.name, grade: user.grade });
    }

    return done(wrong());
  } catch (e) {
    done(e);
  }
});

