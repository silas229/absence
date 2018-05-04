const express = require('express');

const Router = express.Router();

const SubstitutionController = require('../controller/substitution/controller');
const RenewController = require('../controller/authentication/RenewController');
const LoginController = require('../controller/authentication/LoginController');

const { middleware } = require('../middleware/AuthChecker');
const Limiter = require('../middleware/Limiter');

Router.post('/login', LoginController);

Router.use(middleware);
Router.use(Limiter);

// Router.post('/api/auth', LoginController);
Router.post('/api/auth/renew', RenewController);
Router.post('/api/substitution', SubstitutionController);

module.exports = Router;

