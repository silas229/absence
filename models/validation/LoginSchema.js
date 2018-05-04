const Joi = require('joi');

module.exports = {
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
};

