var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const CONNECTION_URL = "mongodb://raduser:luckyluke@stcluster-shard-00-00-n6o7f.mongodb.net:27017,stcluster-shard-00-01-n6o7f.mongodb.net:27017,stcluster-shard-00-02-n6o7f.mongodb.net:27017/test?ssl=true&replicaSet=stCluster-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(CONNECTION_URL, { useMongoClient: true})
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err));

var patient = require('./routes/patient');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/patient', patient);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
