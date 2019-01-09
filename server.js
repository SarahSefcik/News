'use strict';

var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var PORT = process.env.PORT || 3000;
var app = express();

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.text())
    .use(bodyParser.json({ type: 'application/vnd.api+json' }))
    .use(logger('dev'))
    .use(express.static(__dirname + '/public'))
    .engine('handlebars', exphbs({ defaultLayout: 'main' }))
    .set('view engine', 'handlebars')
    .use(require('./controllers'));

mongoose.Promise = Promise;

var dbURI = process.env.MONGODB_URI || "mongodb://heroku_953p4jk0:65o2kuk07l57tfvo57hhlkcfpn@ds253324.mlab.com:53324/heroku_953p4jk0";

mongoose.connect(dbURI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

var db = mongoose.connection;

db.on("open", function () {
    console.log("Mongoose connection successful.");
    app.listen(PORT, function () {
        console.log("App running on port:  " + PORT);
        console.log("Go: http://localhost:" + PORT);
    });
});

module.exports = app;

