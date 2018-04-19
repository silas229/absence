const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const controller = require('./controller/substitution/controller');
const cors = require('cors');
const RenewController = require('./controller/authentication/RenewController');
const Raven = require('raven');


const app = express();
const { middleware } = require('./middleware/AuthChecker');
const LoginController = require('./controller/authentication/LoginController');
const Strategy = require('./controller/authentication/passport/login');


Raven.config(process.env.DSN).install();
app.use(Raven.requestHandler());
app.use(Raven.errorHandler());
app.use((err, req, res, next) => {
  res.statusCode = 500;
  res.end(`${res.sentry}\n`);
});


app.use(cors());

app.use(express.static(path.join(__dirname, './public/build')));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, './public/build', 'index.html')));

app.use(bodyParser.json());
app.use(passport.initialize());

passport.use('local-login', Strategy);

app.use('/api', middleware);
app.post('/api/auth', LoginController);
app.post('/api/auth/renew', RenewController);
app.post('/api/substitution', controller);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;

