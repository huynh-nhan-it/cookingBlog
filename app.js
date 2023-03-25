var createError = require('http-errors');
var express = require('express');
var path = require('path');
const flash = require('connect-flash');
var cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
var logger = require('morgan');
const session = require('express-session');
var db = require("./db/connect");
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
dotenv.config();

var recipesRouter = require('./routes/recipe');
db.Connect();
var app = express();

// view engine setup
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');

app.use(flash());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : path.join(__dirname, 'public/temp')
}));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', recipesRouter);

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
  res.render('error');
});

module.exports = app;
