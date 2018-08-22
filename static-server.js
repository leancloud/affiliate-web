var express = require('express');
var app = express();

const NOT_FOUND = (req, res) => res.status(404).send('Not found');

app.use(express.static('.'));
// Ignore cloud functions
app.get('/1.1/functions/_ops/metadatas', NOT_FOUND);
app.get(/.*/, function root(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.use(NOT_FOUND);

app.listen(parseInt(process.env.LC_APP_PORT || 3000, 10));
