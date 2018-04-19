const logic = require('./logic');

module.exports = async (req, res) => {
  logic({ reporter: res.json, classID: req.body.classID });
};
