const burns = require('burns');
const reportHandler = require('../../util/reportHandler');

module.exports = (req, res) => {
  burns.dispatch('dataArchiveRequest', {
    recipient: req.user,
  });
  reportHandler({ reporter: res.json, optionalValue: { details: 'Kicked off Delivery' } });
};
