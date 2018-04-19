const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');

function middleware(req, res, next) {
    if(!req.headers.authorization) return ender(res);
    const token = req.headers.authorization;
    const logic = logic(token);
    if(logic.err) return ender(res);

    req.user = logic.user;

    Raven.setUserContext({
        email: logic.user.email,
        id: logic.user._id,
    });
    next();

}

function logic(token) {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return {err: err};

        return User.findById(decoded.sub, (userErr, user) => {
            if(userErr || !user) return {err: userErr};
            return {user: user}
        })
    })
}

function ender(res) {
    return res.status(401).json({error: "Unauthorized"}).end();
}

module.exports = {middleware, logic};

