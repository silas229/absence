const burns = require('burns');

function absenceStatusUpdated(data) {

}

function absencesPurged(data) {

}


// eslint-disable-next-line global-require
module.exports = () => burns.registerEvents({
  absenceStatusUpdated,
  absencesPurged,
});
