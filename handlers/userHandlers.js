function sendUserTemporaryPassword(data) {

}

function resetUserPassword(data) {

}

function enableTwoFactorAuth(data) {

}

function disableTwoFactorAuth(data) {

}
// eslint-disable-next-line global-require
module.exports = () => require('burns').registerEvents({
  sendUserTemporaryPassword, resetUserPassword, enableTwoFactorAuth, disableTwoFactorAuth,
});
