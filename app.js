var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


const r1 = require('./routes/t8fileCrud/routerFile');
const r2 = require('./routes/t9mysqlCrud/index');
const r3 = require('./routes/t10attenc/index');
const r4 = require('./routes/t11dyngrid/index');
const r5 = require('./routes/t12searchFilter/index');

const allRouter =  [r1,r2,r3,r4,r5]





// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/Task')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

allRouter.forEach(routes=>{
  //console.log(routes);
  app.use('/',routes)
})
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
