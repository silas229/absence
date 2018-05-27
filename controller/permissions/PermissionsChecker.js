const RankSchema = require('mongoose').model('Rank');
const UserSchema = require('mongoose').model('User');
const reportHandler = require('../../util/reportHandler');

async function userToPermissions(req, res) {
  let permissionsArray;
  try {
    const userID = await UserSchema.findOne({ email: req.user.email }).exec();
    const rank = await RankSchema.findOne({ _id: userID }).exec();
    permissionsArray = rank.permissions_array;
  } catch (err) {
    reportHandler({ err, reporter: res.json });
  }
  return permissionsArray;
}

async function checkPermissions({ req, res, permission }) {
  const permissions = await userToPermissions(req, res);
  if (!(permissions.includes(permission))) {
    reportHandler({ err: new Error('Insufficient Permissions'), reporter: res.json, auth: true });
  }
}

function permissionsMiddleware(req, res, next) {
  checkPermissions({ req, res, permission: req.permission }).then(() => next());
}


module.exports = { checkPermissions, permissionsMiddleware };
