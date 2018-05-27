const absenceHandlers = require('./absenceHandlers');
const privacyHandler = require('./dataExportHandler');
const userHandlers = require('./userHandlers');

module.exports = () => absenceHandlers() && privacyHandler() && userHandlers();
