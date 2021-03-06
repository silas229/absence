/* eslint-disable consistent-return */
const passport = require('passport');
const reportHandler = require('../../util/reportHandler');

const LoginSchema = require('../../models/validation/LoginSchema');

const Joi = require('joi');

// Login Middleware

module.exports = (req, res, next) => {
  Joi.validate(req.body, LoginSchema, (err) => {
    if (err !== null) {
      return reportHandler({
        auth: true,
        err,
        reporter: res,
        optionalValue: { message: err.message, errors: err },
      });
    }
  });

  passport.authenticate('local', (err, token, userData) => {
    if (err || token === false || userData.message === 'Missing credentials') {
      let error = new Error('InternalError');
      if (userData && userData.message === 'Missing credentials') error = new Error(userData.message);
      if (err && err.name === 'IncorrectCredentialsError') error = new Error(err.name);
      return reportHandler({ auth: true, err: error, reporter: res });
    }


    return reportHandler({ reporter: res, optionalValue: { token, user: userData } });
  })(req, res, next);
};

