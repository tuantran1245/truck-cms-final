var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');
var fs = require('fs');
require('dotenv').config();

// for support method put, delete, and others via form view
const methodOverride = require('method-override');

const FroalaEditor = require('./lib/froalaEditor.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(__dirname + '/'));
app.use(express.static(path.join(__dirname, 'public')));

// override with POST having ?_method=some_method
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);

//console.log(process.env.test);

app.post('/upload_image', function (req, res) {

  FroalaEditor.Image.upload(req, '/uploads/', function (err, data) {

    if (err) {
      console.log(err);
      return res.send(JSON.stringify(err));
    }
    res.send(data);
  });
});

app.post('/delete_image', function (req, res) {

  FroalaEditor.Image.delete(req.body.src, function (err) {

    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }
    return res.end();
  });
});

app.get('/load_images', function (req, res) {

  FroalaEditor.Image.list('/uploads/', function (err, data) {

    if (err) {
      console.log(err);
      return res.status(404).end(JSON.stringify(err));
    }
    return res.send(data);
  });
});

// Create folder for uploading files.
var filesDir = path.join(path.dirname(require.main.filename), 'uploads');
if (!fs.existsSync(filesDir)){
    fs.mkdirSync(filesDir);
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send({ error: 'Not found' })
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).send({ error: err })
});

module.exports = app;
