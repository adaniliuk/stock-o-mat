var express = require('express'),
    request = require('request');
var app = express();

var FINANCE_API_URL = 'http://finance.yahoo.com/d/quotes.csv?s={quotes}&f=sl1c1p2';

/*
var priceData = [
  {id: "GOOG", price: 1157.93, priceChange: -25.11, percentChange: -2.12},
  {id: "FB", price: 64.10, priceChange: -3.14, percentChange: -4.67},
  {id: "EPAM", price: 32.12, priceChange: -0.32, percentChange: -0.99},
  {id: "MSFT", price: 40.49, priceChange: 0.33, percentChange: 0.82}
];
*/

app.get('/quotes', function(req, res) {
  if (!req.query.s) {
    req.statusCode = 404;
    return req.send('Error 404: No quote found');
  }

  var symbols = req.query.s; // todo: is any kind of encode/decode required? additional validation?
  requestPriceData(symbols, res); // todo: revise how this function is called, refactor
});

function requestPriceData(symbols, res) {
  var requestUrl = FINANCE_API_URL.replace('{quotes}', symbols);

  request(requestUrl, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      // todo: response is returned in scv format, need to parse it to json
      res.send(body); // todo: add jsonp support
    }
  });
}

var server = app.listen(process.env.PORT || 63342, function() {
  console.log('Listening on port %d', server.address().port);
});
