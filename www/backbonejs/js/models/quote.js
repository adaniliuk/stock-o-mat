var StockMachine = StockMachine || {};

(function() {
    'use strict';

    // Quote model
    StockMachine.Quote = Backbone.Model.extend({
        idAttribute: 'symbol',
        defaults: function () {
            return {
                price: 0,
                priceChange: 0,
                percentChange: 0
            };
        },
        validate: function (attrs, options) {
            // todo: add validation against symbol format
            // todo: add validation to check if symbol is real
            if (!attrs.id) { // id is presented by quote symbol, e.g. GOOG
                return 'Symbol cannot be empty!';
            }
        }
    });
}());

