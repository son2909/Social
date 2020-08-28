// define dependences
var express = require('express');
var mongoose = require('mongoose');
const redis = require('redis');
const compression = require('compression');
const expressStatusMonitor = require('express-status-monitor');
const app = express();
require('dotenv').config();
const cp = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const logger = require('morgan');
const chalk = require('chalk');
const Constant = require('./constant');
const config = require('./config/utils');
const rateLimit = require("express-rate-limit");
var session = require('express-session');
const bodyparser = require('body-parser');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes 
  max: 1000 // limit each IP to 100 requests per windowMs
});
app.use(cp());
app.use(logger('dev'));
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(limiter);
//create redis client

//content
app.use(session({
  secret: 'dsahjkdsa',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));
app.use(cors());
app.use(function (req, res, next) {
  // Website you wish to allow to connect

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('X-Frame-Options', 'sameorigin');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  res.setHeader('X-powered-by', false);
  res.cookie('promo_shown', 1);
  res.cookie('Max-Age', 2600000);
  res.cookie('Secure', true);
  res.cookie('sameSite', 'none');
  res.cookie('third_party_var', 'value', { sameSite: 'none', Secure: true });
  res.cookie('third_party_var', 'value', { Secure: true });
  res.setHeader('set-cookie', [
    'cookie1=value1; SameSite=Lax',
    'cookie2=value2; SameSite=None; Secure',
  ]);
  // Pass to next layer of middleware
  next();
});
app.get('/', (req, res) => {
  let cookieVal = null;

  if (req.cookies['third_party_var']) {
    // check the new style cookie first
    cookieVal = req.cookies['third_party_var'];
  } else if (req.cookies['third_party_var']) {
    // otherwise fall back to the legacy cookie
    cookieVal = req.cookies['third_party_var'];
  }

  res.end('welcome to i-social');
});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(expressStatusMonitor());
app.use(compression());
app.set('port', process.env.PORT || 3001);
require('./routes')(app);
mongoose.connect(process.env.DB ? process.env.DB : Constant.db, { useNewUrlParser: true, useUnifiedTopology: true }, (err, rs) => {
  if (!err) {
    console.log('%s MongoDB connected.', chalk.green('✓'));
  }
  else {
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
  }
});

module.exports = app;