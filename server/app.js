var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const methodOverride = require('method-override')
if(process.env.NODE_ENV !== 'production'){
  console.log("Loading .env")
  require('dotenv').config();
}

// Authentication
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport');
var MongoDBStore = require('connect-mongodb-session')(session)

// Routes
var apiRouter = require('./routes/api');
var appRouter = require('./routes/app');
var blogRouter = require('./routes/app.blog');
var adminRouter = require('./routes/admin/app.admin');
var authenticationRouter = require('./routes/app.authenticate');




var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
global.__basedir = path.resolve(__dirname);

app.use(methodOverride('_method'));

var store = new MongoDBStore({
  uri: process.env.DATABASE_CONNSTR,
  collection: 'sessions',
  unset:'destroy'
},
function(error) {
  console.log("MONGODB_SESSION_ERROR_CTOR:",error);
});
store.on('error', function(error) {
  console.log("MONGODB_SESSION_ON_ERROR:",error);
});

app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  //store: store, using in memory for now
  resave: false,
  saveUninitialized: false,
  //unset: 'destroy'
}));
 
app.use(passport.initialize())



app.use(passport.session())


// Routes
app.use('/api', apiRouter);
app.use('/blog',blogRouter);
app.use('/admin',adminRouter);
app.use('/authenticate',authenticationRouter);
app.use('*', appRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log("ERROR!",err);
  // render the error page
  res.status(err.status || 500);
  res.json(err);
  //res.render('error'); (not implemented)
});


module.exports = app;
