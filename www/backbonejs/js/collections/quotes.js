var StockMachine = StockMachine || {};

(function() {
    'use strict';

    // Quotes collection
    StockMachine.Quotes = Backbone.Collection.extend({
        model: StockMachine.Quote,
        // Local Storage is required to keep symbols list persistent
        localStorage: new Backbone.LocalStorage('stock-o-mat-quotes'),
        initialize: function () {
            this.on('sync', this.fetchPriceData);
            this.on('quotes:priceReceived', this.setPriceData);
        },
        fetchPriceData: function () {
            var symbols = this.pluck('id');
            this.fetchPriceDataFromServer(symbols);
        },
        fetchPriceDataFromServer: function (symbols) {
            if (0 === symbols.length) return;

            var that = this;
            var sParam = _.map(symbols, function(symbol) {
                return encodeURIComponent(symbol);
            }).join('+');
            var url = '/quotes/' + sParam;

            $.getJSON(url).done(function(data) {
                if (data) {
                    that.priceData = data;
                    that.trigger('quotes:priceReceived');
                }
            });
        },
        setPriceData: function() {
            this.forEach(function(quote) {
                var quotePrice = _.find(this.priceData, function (price) {
                    return price.symbol == quote.get('id');
                });
                if (quotePrice) {
                    quote.set(quotePrice, { silent:true });
                }
            }, this);
            this.trigger('quotes:priceSet');
        }
    });
    StockMachine.quotes = new StockMachine.Quotes();
}());