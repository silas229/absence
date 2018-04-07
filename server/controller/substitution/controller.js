const logic = require('./logic');
module.exports = async (req, res) =>{
    let lol = await logic(req.user.grade)
    res.json(lol)
} ;

