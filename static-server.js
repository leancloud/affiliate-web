var express = require('express');
var app = express();
var AV = require('leanengine');

var APP_ID = process.env.LC_APP_ID; // your app id
var APP_KEY = process.env.LC_APP_KEY; // your app key
var MASTER_KEY = process.env.LC_APP_MASTER_KEY; // your app master key

AV.initialize(APP_ID, APP_KEY, MASTER_KEY);

app.use(AV.Cloud);
app.use(express.static('.'));
app.use(function(req, res, next) {
  res.status(404).sendFile(__dirname + '/404.html');
});

app.listen(parseInt(process.env.LC_APP_PORT || 3000, 10));
