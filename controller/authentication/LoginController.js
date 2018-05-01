const passport = require('passport');
const reportHandler = require('../../util/reportHandler');

module.exports = async (req, res, next) => {
  // Plug in Validation :)

  const validation = true;
  if (!validation) {
    return res.status(400).json({
      success: false,
      // message: validationResult.message,
      // errors: validationResult.errors,
    });
    // return reportHandler({ auth: true, err: new Error('FAIL'), reporter: res,
    // optionalValue: {message: validationResult.message, errors: validationResult.errors}});
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err || token === false || userData.message === 'Missing credentials') {
      let error = 'InternalError';
      if (err.name === 'IncorrectCredentialsError') {
        error = err.name;
      }
      return reportHandler({ auth: true, err: error, reporter: res });
    }
    return reportHandler({ reporter: res, optionalValue: { token, user: userData } });
  })(req, res, next);
};

