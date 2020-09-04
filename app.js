var express = require('express');
var mongoose = require('mongoose');
const redis = require('redis');
const compression = require('compression');
const expressStatusMonitor = require('express-status-monitor');
const expressValidator = require('express-validator');
const app = express();
require('dotenv').config();
const cors = require('cors');
const logger = require('morgan');
const config = require('./config/utils');
const rateLimit = require("express-rate-limit");
var session = require('express-session');
const bodyparser = require('body-parser');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes 
  max: 1000 // limit each IP to 100 requests per windowMs
});
app.use(logger('dev'));
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(limiter);
app.use(expressValidator());
//create redis client


//file router 
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

  // Pass to next layer of middleware
  next();
});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
require('./routes')(app);
mongoose.connect(process.env.DB ? process.env.DB : config.db, { useNewUrlParser: true, useUnifiedTopology: true }, (err, rs) => {
  if (!err) console.log('connect success DB');
  else console.log('connect fail DB');
});
//module exports
module.exports = app;