var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var app = express();

require('dotenv').config();
require('./config/database');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({type: "*/x-www-form-urlencoded"}))

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/auth'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/flights', require('./routes/api/flights'));


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var port = process.env.PORT || 3001;

app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
});