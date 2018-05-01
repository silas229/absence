/* eslint-disable consistent-return */
module.exports = ({
  err, reporter, optionalValue, auth = false,
}) => {
  if (err) {
    const ErrorObj = {
      Operation: {
        status: 'Error',
        message: err,
      },
    };
    if (typeof reporter.status === 'function' && typeof reporter.json === 'function') {
      return reporter.status((auth ? 401 : 500)).json(ErrorObj).end();
    }
    return reporter(ErrorObj);
  }
  reporter({
    Operation: {
      status: 'Success',
      ...optionalValue,
    },
  });
};

