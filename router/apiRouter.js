const express = require('express');

const Router = express.Router();

const SubstitutionController = require('../controller/substitution/controller');
const RenewController = require('../controller/authentication/RenewController');
const LoginController = require('../controller/authentication/LoginController');
const DataExportController = require('../controller/privacy/DataExport');

const { middleware } = require('../middleware/AuthChecker');
const Limiter = require('../middleware/Limiter');

Router.post('/login', LoginController);

Router.use(middleware);
Router.use(Limiter);

// [(req, res, next) => req.permission ="", permissionsMiddleware]
// or does [req.permission = "", permissionMiddleware] work?

// Router.post('/api/auth', LoginController);
Router.post('/api/auth/renew', RenewController);
Router.post('/api/substitution', SubstitutionController);
Router.get('/api/dataExport', DataExportController);

module.exports = Router;

