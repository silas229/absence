/* eslint-disable consistent-return */

function returnMatching(reporter, value) {
  if (typeof reporter.status === 'function' && typeof reporter.json === 'function') {
    return reporter.json(value).end();
  }
  reporter(value);
}

module.exports = ({
  err, reporter, optionalValue, auth = false, status = 500,
}) => {
  if (err) {
    const ErrorObj = {
      Operation: {
        status: 'Error',
        message: err,
        errorId: reporter.sentry,
      },
    };
    if (typeof reporter.status === 'function' && typeof reporter.json === 'function') {
      return reporter.status((auth ? 401 : status)).json(ErrorObj).end();
    }
    return reporter(ErrorObj);
  }

  return returnMatching(reporter, {
    Operation: {
      status: 'Success',
      ...optionalValue,
    },
  });
};
