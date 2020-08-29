// use .env file
require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var logger = require('morgan');
var hbs = require('hbs');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var userService = require('./services/user');
var passwordUtil = require('./utils/password');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var authRouter = require('./routes/auth');
var bookRouter = require('./routes/book');

// configs
require('./configs/handlebars');

var app = express();

// connect to mysql database
require('./mysql');

//


// passport setup
passport.use(new LocalStrategy(
  function(username, password, done) {
    userService.findById(username, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!passwordUtil.checkPassword(password, user.password)) { return done(null, false); }
      return done(null, user);
    })
  }
));

passport.serializeUser(function(user, done) {
  delete user.password;
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
//---------------------------------------------------

// view engine setup
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// passport middlewares
app.use(passport.initialize());
app.use(passport.session());

// app routes
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/book', bookRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {layout: false});
});

module.exports = app;
