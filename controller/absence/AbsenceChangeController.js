/* eslint-disable consistent-return,no-underscore-dangle,no-param-reassign,no-return-assign */
const equal = require('fast-deep-equal');
const reportHandler = require('../../util/reportHandler');
const objectHash = require('object-hash');

const Absence = require('mongoose').model('Absence');

/**
 *
 * @param AbsenceInstance The Absence Object/Document created by Mongoose
 * @param AbsenceChangeObject The Object which is tracking modifications
 * @param reporter should be either res.json or console.log
 */
function insert({
  AbsenceInstance,
  AbsenceChangeObject,
  reporter,
} = {}) {
  if (!AbsenceInstance.absence_log.some(o => o._id = undefined && equal(o, AbsenceChangeObject))) {
    // eslint-disable-next-line camelcase
    const { absence_log } = AbsenceChangeObject;
    if (AbsenceInstance.absence_log > 0) {
      AbsenceChangeObject.previous_change = objectHash(absence_log[absence_log.length - 1]);
    } else {
      AbsenceChangeObject.previous_change = null;
    }

    AbsenceInstance.absence_log.create(AbsenceChangeObject);
  }

  AbsenceInstance.save(err => reportHandler({ err, reporter }));
}

/**
 *
 * @param user The change-issuing User
 * @param AbsenceInstance An Instance of the Absence Document from the DB
 * @param targetField the field in the document we're targeting
 * @param oldValue kinda selfexplaining
 * @param newValue see @oldValue
 * @param additional extra params to save in the Change Object in case we need it.
 */
function changeGeneric(user, AbsenceInstance, targetField, oldValue, newValue, ...additional) {
  insert({
    AbsenceInstance,
    AbsenceChangeObject: {
      user: user._id,
      timestamp: Date.now(),
      target_field: targetField,
      old_value: oldValue,
      new_value: newValue,
      additional,
    },

  });
}

/**
 *
 * @param user
 * @param resultField
 * @param value
 * @param reporter
 */
// TODO: add issuer, because the issuing user has to be proxied to #changeGeneric
function setGenericAbsenceProperty({
  user, resultField, value, reporter,
}) {
  Absence.findOne({ user: user._id }).exec((err, result) => {
    result[resultField] = value;
    changeGeneric(user, result, resultField, !value, value);
    reportHandler({ err, reporter });
  });
}

module.exports = {
  // insert,
  createInitialChange: ({ user, AbsenceInstance } = {}) => changeGeneric(user, AbsenceInstance, 'all', null, 'Genesis'),
  setGenericAbsenceProperty,
};
