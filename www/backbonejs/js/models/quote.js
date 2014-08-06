var StockMachine = StockMachine || {};

(function() {
    'use strict';

    // Quote model
    StockMachine.Quote = Backbone.Model.extend({
        defaults: function () {
            return {
                price: 0,
                priceChange: 0,
                percentChange: 0
            };
        },
        symbolFormat: /^[A-Za-z0-9]+\.{1,1}[A-Za-z0-9]+$|^[A-Za-z0-9]+$/,
        validate: function (attrs, options) {
            if (!attrs.id) { // id is presented by quote symbol, e.g. GOOG, MSFT, etc.
                return 'Ticker symbol cannot be empty!';
            }
            if (!this.symbolFormat.test(attrs.id)) {
                return 'Ticker symbol format is invalid!';
            }
            if (attrs.price < 0) {
                return 'Price should be positive!';
            }
        }
    });
}());
