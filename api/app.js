(function() {
    'use strict';

    var express = require('express'),
        request = require('request'),
        csvparser = require('csv-parse'),
        config = require('./config.json');

    var env = process.env.NODE_ENV || config.env.environment,
        port = process.env.PORT || config.env.httpPort,
        appRoot = __dirname;

    var useFinanceApi = config.useFinanceApi, // defines whethe mock or finance api data is returned
        financeApiUrl = config.financeApiUrl,
        parseOptions = {
            columns: ['symbol', 'price', 'priceChange', 'percentChange'],
            auto_parse: true
        };

    // init express app
    var app = express();

    if (config.env.returnStatic) {
        // application returns client app static, so static middleware should be configured
        app.use(express.static(appRoot + '/../www'));
    }

    // quotes api route returns quotes price data
    // [{symbol: "GOOG", price: 1157.93, priceChange: -25.11, percentChange: -2.12},
    // {symbol: "FB", price: 64.10, priceChange: -3.14, percentChange: -4.67}];
    app.get('/quotes/:symbols', function (req, res, next) {
        var symbols = req.params.symbols.split('+');

        if (0 === symbols.length) {
            return next(new Error('Missing symbols list'));
        }

        if (useFinanceApi) {
            var sParam = symbols
                .map(function (symbol) {
                    return encodeURIComponent(symbol);
                })
                .join('+');
            var requestUrl = financeApiUrl.replace('{quotes}', sParam);

            // retrieves quotes info from yahoo finance api
            request(requestUrl, function (quotesErr, quotesRes, data) {
                if (quotesErr || 200 !== quotesRes.statusCode) {
                    return next(quotesErr);
                }
                if (!data) {
                    return next(new Error('Requested symbols quotes are missing'));
                }

                // parses price data from CSV to JSON format
                csvparser(data, parseOptions, function (parseErr, quotes) {
                    if (parseErr) {
                        return next(parseErr);
                    }

                    return res.json(quotes);
                });
            });
        } else {
            var data = config.mockData;
            return res.json(data);
        }
    });

    // other cases route simply returns some help info
    app.get('*', function (req, res) {
        res.sendfile('help.html');
    });

    // global error handler
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

    // start server
    var server = app.listen(port, function () {
        console.log('Listening on port %d', server.address().port);
    });
}());
