/* eslint-disable no-console,global-require */
const mongoose = require('mongoose');
const mongooseSanitizer = require('mongoose-sanitizer');

module.exports.connect = async () => {
  await mongoose.connect(process.env.MONGO_STRING);

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  const UserSchema = require('./models/UserSchema');
  const AbsenceSchema = require('./models/AbsenceSchema');

  mongoose.model('User', UserSchema);

  AbsenceSchema.plugin(mongooseSanitizer);
  mongoose.model('Absence', AbsenceSchema);

  // mongoose.model('AbsenceChange', require('./controller/absence/AbsenceChangeSchema'));

  return mongoose;
};

