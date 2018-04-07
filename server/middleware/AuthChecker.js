const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');

module.exports = async (req, res, next) => {
    if(!req.headers.authorization) return res.status(401).end();
    const token = req.headers.authorization;

    return jwt.verify(token, 'SECRET' /*process.env.JWT_SECRET*/, (err, decoded) => {
        if(err) return res.status(401).end();

        return User.findById(decoded.sub, (userErr, user) => {
            if(userErr || !user) return res.status(401).end();
            req.user = user;
            return next();
        })
    })

};

