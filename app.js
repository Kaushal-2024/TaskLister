var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


const r1 = require('./routes/t8fileCrud/routerFile');
const r2 = require('./routes/t9mysqlCrud/index');
const r3 = require('./routes/t10attenc/index');
const r4 = require('./routes/t11dyngrid/index');
const r5 = require('./routes/t12searchFilter/index');
const r6 = require('./routes/t13deliSearch/index');
const r7 = require('./routes/t14studentIU/index');
const r8 = require('./routes/t15jobIU/index');
const r9 = require('./routes/t16jsonpl/index');
const r10 = require('./routes/t17timezone/index');

const allRouter =  [r1,r2,r3,r4,r5,r6,r7,r8,r9,r10]


app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


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
  // console.log(routes);
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
