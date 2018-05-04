const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
const Raven = require('raven');
const Helmet = require('helmet');

const app = express();
const Strategy = require('./controller/authentication/passport/LoginLogic');

const reportHandler = require('./util/reportHandler');

const APIRouter = require('./router/apiRouter');

Raven.config(process.env.SENTRY_DSN).install();
app.use(Raven.requestHandler());
app.use(Raven.errorHandler());


app.use(cors());
app.use(Helmet());

if (process.env.PROXY) app.enable('trust proxy');

app.use(express.static(path.join(__dirname, './public/build')));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, './public/build', 'index.html')));

app.use(bodyParser.json());
app.use(passport.initialize());

passport.use('local', Strategy);

app.use(APIRouter);


// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  reportHandler({
    err,
    reporter: res,
    status: (err.status || 500),
  });
});

module.exports = app;

