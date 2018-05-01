/* eslint-disable no-console */
const Client = require('dsbclient');

const cheerio = require('cheerio');
const util = require('./util');

const client = new Client(process.env.DSB_ID, process.env.DSB_PASS);


module.exports = function compose({
  classID = 'J2',
  reporter = console.log,
} = {}) {
  client
    .fetch()
    .then(util.computeMatchingDay)
    .then(util.requester)
    .then(cheerio.load)
    .then($ => util.prepareData($, classID))
    .then(reporter);
  // .catch(e => Raven.captchureException(e));
};
