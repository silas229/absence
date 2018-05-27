const sendTemplateMail = require('../util/sendTemplateEmail');
const Zip = require('node-native-zip');
const User = require('mongoose').model('User');
const burns = require('burns');
const Absence = require('mongoose').model('Absence');

function readStreamToBuffer(readStream) {
  // readStream.pipe(fs.createWriteStream(`users${(new Date()).getTime()}.csv`));
  return new Promise((resolve) => {
    const buffers = [];
    readStream.on('data', data => buffers.push(data));
    readStream.on('end', () => resolve(Buffer.concat(buffers)));
  });
}

function addResultToArchive(a, archive, name) {
  if (a.length > 0) archive.add(`${name}.csv`, a);
  return archive;
}

let userID;

function getUserCSV(email) {
  return new Promise((resolve) => {
    User.find({ email })
      .exec()
      .then((docs) => {
        // eslint-disable-next-line no-underscore-dangle
        userID = docs._id;
        return docs;
      })
      .then(docs => User.csvReadStream(docs))
      .then(readStreamToBuffer)
      .then(resolve);
  });
}

function addAbsenceCSV(archive) {
  return new Promise((resolve) => {
    Absence.find({ user: userID })
      .exec()
      // .then((docs) => { console.log(docs); return docs; })
      .then(docs => User.csvReadStream(docs))
      .then(readStreamToBuffer)
      .then(a => addResultToArchive(a, archive, 'abwesenheiten'))
      .then(resolve);
  });
}

function dataArchiveRequest(data) {
  const archive = new Zip();
  getUserCSV(data.recipient.email)
    .then(a => addResultToArchive(a, archive, 'benutzer'))
    .then(addAbsenceCSV)
    .then(a => a.toBuffer())
    .then((finishedArchive) => {
      sendTemplateMail({
        recipient: data.recipient,
        subject: `Datenauskunft zu ${data.recipient.name}`,
        templateName: 'demo',
        attachments: [
          { filename: 'archive.zip', content: finishedArchive },
        ],
      });
    });
}


module.exports = () => burns.registerEvents({
  dataArchiveRequest,
});
