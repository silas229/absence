/* eslint-disable consistent-return */
module.exports = ({ err, reporter, optionalValue }) => {
  if (err) {
    const ErrorObj = {
      Operation: {
        status: 'Error',
        message: err,
      },
    };
    if (typeof reporter.status === 'function' && typeof reporter.json === 'function') {
      return reporter.status(500).json(ErrorObj);
    }
    return reporter(ErrorObj);
  }
  reporter({
    Operation: {
      status: 'Success',
      optionalValue,
    },
  });
};

