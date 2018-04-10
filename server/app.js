const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path');
const controller = require('./controller/substitution/controller');
const cors = require('cors');

require('dotenv').load();

const app = express();

require('./mongoose').connect().then(() => {
    const middleware = require("./middleware/AuthChecker");
    const LoginController = require("./controller/authentication/LoginController");
    const Strategy  = require("./controller/authentication/passport/login");


    app.use(cors());

    app.use(express.static(path.join(__dirname, '/../client/build')));

    app.use(bodyParser.json());
    app.use(passport.initialize());

    passport.use('local-login', Strategy);

    app.use('/api', middleware);

    app.post('/auth', LoginController);

    app.post('/substitution', middleware, controller);

    app.use(function(err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(err.status || 500);
        res.json(err);
    });
});

module.exports = app;


