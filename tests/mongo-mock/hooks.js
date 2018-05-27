const Mongo = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

async function _before(done) {
  mongoServer = new Mongo.MongoMemoryServer();
  const connstring = await mongoServer.getConnectionString();
  await mongoose.connect(connstring, {}, (err) => {
    if (err) done(err);
    done();
  });
}

module.exports = {
  before: done => _before(done).then(),
  after: () => {
    mongoose.disconnect();
    mongoServer.stop();
  },
  mongoose,
};
