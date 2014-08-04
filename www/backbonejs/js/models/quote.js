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
        validate: function (attrs, options) {
            // todo: add validation against ticker symbol format
            // todo: add validation to check if symbol is real
            if (!attrs.id) { // id is presented by quote symbol, e.g. GOOG, MSFT, etc.
                return 'Ticker symbol cannot be empty!';
            }
            if (attrs.price < 0) {
                return 'Price should be positive!';
            }
        }
    });
}());