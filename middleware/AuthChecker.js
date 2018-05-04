/* eslint-disable no-underscore-dangle,consistent-return */
const jwt = require('jsonwebtoken');

const User = require('mongoose').model('User');
const reportHandler = require('../util/reportHandler');

function logic(token) {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return { err };

    return User.findById(decoded.sub, (userErr, user) => {
      if (userErr || !user) return { err: userErr };
      return { user };
    });
  });
}

function ender(res) {
  return reportHandler({ err: new Error('Unauthorized'), auth: true, reporter: res });
}

function middleware(req, res, next) {
  if (!req.headers.authorization) return ender(res);
  const token = req.headers.authorization;
  const intermediateUser = logic(token);
  if (logic.err) return ender(res);

  req.user = intermediateUser.user;

  Raven.setUserContext({
    email: intermediateUser.email,
    id: intermediateUser._id,
  });
  next();
}


module.exports = { middleware, logic };

