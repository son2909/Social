const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const rateLimit = require("express-rate-limit");
const sass = require('node-sass-middleware');
const flash = require('express-flash');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const chalk = require('chalk');
const Constant = require('./config/utils');
const timeout = require('connect-timeout')
const dotenv = require('dotenv');
const i18n = require("i18n");
const querystring= require('querystring');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes 
    max: 1000 // limit each IP to 200 requests per windowMs
  });
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
/**
 * Create Express server.
 */
const app = express();
app.use(logger('dev'));
dotenv.config();
app.use(limiter);


/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.use(expressValidator());
app.use(expressStatusMonitor());
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));
app.use(session({
    secret: 'i-social',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));
app.use(flash());

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
app.disable('x-powered-by');

i18n.configure({
    locales: Constant.LOCALE,
    directory: __dirname + '/locales',
    extension: '.json',
    register: global,
  });
//file router 
// const user = require('./routes/user');

require('./routes')(app);

mongoose.connect(process.env.DB ? process.env.DB : Constant.db, { useNewUrlParser: true, useUnifiedTopology:true }, (err, rs) => {
    if (!err) {
      console.log('%s MongoDB connected.', chalk.green('✓'));
    }
    else {
      console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
      process.exit();
    }
});

module.exports = app;