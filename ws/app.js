var express = require('express');
var app = express();

app.get('/quotes', function(req, res) {
    res.send('Hello word');
});

var server = app.listen(63342, function() {
    console.log('Listening on port %d', server.address().port);
});