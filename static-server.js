var express = require('express');
var app = express();

app.use(express.static('.'));
app.get(/.*/, function root(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.use(function(req, res, next) {
  res.status(404).send('Not found');
});

app.listen(parseInt(process.env.LC_APP_PORT || 3000, 10));
