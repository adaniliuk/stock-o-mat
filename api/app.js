(function() {
    //todo: review error handling strategy
    //todo: review todo

    'use strict';

    var express = require('express'),
        request = require('request'),
        csvparser = require('csv-parse');

    var env = process.env.NODE_ENV || 'development';
    var port = process.env.PORT || 4711;
    var appRoot = __dirname;

    var financeApiUrl = 'http://finance.yahoo.com/d/quotes.csv?s={quotes}&f=sl1c1p2';
    var parseOptions = {
        columns: ['symbol', 'price', 'priceChange', 'percentChange'],
        auto_parse: true
    };

    // init express app
    var app = express();

    // application returns client app static, so static middleware should be configured
    app.use(express.static(appRoot + '/../www'));

    // main api route simply returns some help info
    app.get('/', function (req, res) {
        // todo: refactor this, template?
        res.sendfile('help.html');
    });

    // quotes api route returns quotes price data
    // [{symbol: "GOOG", price: 1157.93, priceChange: -25.11, percentChange: -2.12},
    // {symbol: "FB", price: 64.10, priceChange: -3.14, percentChange: -4.67}];
    app.get('/quotes/:symbols', function (req, res, next) {
        var symbols = req.params.symbols; //todo: check if encoding and symbols validation is required
        var requestUrl = financeApiUrl.replace('{quotes}', symbols);

        // retrieves quotes info from yahoo finance api
        request(requestUrl, function (quotesErr, quotesRes, data) {
            if (quotesErr || 200 !== quotesRes.statusCode) {
                return next(quotesErr);
            }
            if (!data) {
                return next(new Error('No quotes data found'));
            }

            // parses price data from CSV to JSON format
            csvparser(data, parseOptions, function (parseErr, quotes) {
                if (parseErr) {
                    return next(parseErr);
                }

                return res.json(quotes);
            });
        });
    });

    // error handler
    app.use(function(err, req, res, next) {
        console.error(err.stack || String(err));

        var error = {};
        if ('development' === env) {
            error.error = err.message;
            error.stack = err.stack;
        } else {
            error.error = "Internal API error occurred";
        }
        res.status(500).json(error);
    });

    //todo: check process.env.PORT
    // start server
    var server = app.listen(port, function () {
        console.log('Listening on port %d', server.address().port);
    });
}());
