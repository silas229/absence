/* eslint-disable no-underscore-dangle,no-param-reassign */
const AbsenceChangeController = require('./AbsenceChangeController');

const Absence = global.mongoose.model('Absence');

const reportHandler = require('../../util/reportHandler');

/**
 * This Controller function uses the Proxy function
 * <b>createInitialChange</b> to insert a Absence Document with a
 * Genesis Absence Change, to indicate that it is new.
 *
 * Saving is handled by the AbsenceChangeController.
 * @param req
 * @param res
 */
function add(req, res) {
  AbsenceChangeController.createInitialChange({
    user: req.user,
    AbsenceInstance: new Absence({
      excused: false,
      persistent_excuse: false,
      timestamp: Date.now(),
      relevant_lessons: '1-6',
      reason: 'Kein Bock lol',
      // TODO: Implement tutor find
      tutor: '',
    }),
    reporter: res,
  });
}

/**
 * This Controller function simply finds all Absences in Database,
 * for easy display it sorts them too.
 * @param req
 * @param res
 */
function findForUser(req, res) {
  Absence.find({ user: req.user._id })
    .sort({ timestamp: 'desc' })
    .exec((err, result) => reportHandler({ err, reporter: res, optionalValue: result }));
}

/**
 * This function is meant for the Teacher Control Panel.
 * It has the purpose to find all Absences from the tutees of a specific Tutor.
 * @param req
 * @param res
 */
function findTutees(req, res) {
  Absence.find({ tutor: req.user._id })
    .sort({ timestamp: 'desc' })
    .exec((err, result) => reportHandler({ err, reporter: res, optionalValue: result }));
}


/**
 * This function should purge all Absence Entries and all AbsenceChange SubDocuments.
 * It is meant for the end of each quarter.
 * @param req
 * @param res
 */
function purgeAll(req, res) {
  Absence.remove({}, (err, removed) =>
    reportHandler({ err, reporter: res, optionalValue: removed }));
}

module.exports = {
  add,
  purgeAll,
  findForUser,
  findTutees,
  changeExcused: (req, res) => {
    AbsenceChangeController.setGenericAbsenceProperty({
      user: req.user, resultField: 'excused', value: true, reporter: res.json,
    });
  },
  changePersistentExcuse: (req, res) => {
    AbsenceChangeController.setGenericAbsenceProperty({
      user: req.user, resultField: 'persistent_excuse', value: true, reporter: res.json,
    });
  },
};
