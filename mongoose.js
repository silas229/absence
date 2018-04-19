/* eslint-disable no-console,global-require */
const mongoose = require('mongoose');

module.exports.connect = async () => {
  await mongoose.connect(process.env.MONGO_STRING);

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  mongoose.model('User', require('./controller/users/UserSchema'));
  mongoose.model('Absence', require('./controller/absence/AbsenceSchema'));
  // mongoose.model('AbsenceChange', require('./controller/absence/AbsenceChangeSchema'));
};
