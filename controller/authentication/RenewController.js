/* eslint-disable no-param-reassign */
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const result = refresh(req.body.token);
  res.status(result.code).json(result.payload);
};

const refresh = token => jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
  if (err) {
    return { code: 401, payload: { error: { name: err.name } } };
  }
  delete payload.iat;
  delete payload.exp;
  delete payload.nbf;
  delete payload.jti;
  return { code: 200, payload: { token: jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' }) } };
});
