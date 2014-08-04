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
            var that = this;
            var sParam = symbols.join('+');
            var url = '//localhost:4711/quotes/' + sParam; //todo: revise url configuration

             $.getJSON(url).done(function(data) {
                if (data) {
                    that.priceData = data;
                    that.trigger('quotes:priceReceived');
                    // todo: update time
                }
             });

            // temporary return test data
            //var priceData = [
            //    { symbol: "GOOG", price: 1157.93, priceChange: -25.11, percentChange: -2.12 },
            //    { symbol: "FB", price: 64.10, priceChange: -3.14, percentChange: -4.67 },
            //    { symbol: "EPAM", price: 32.12, priceChange: -0.32, percentChange: -0.99 },
            //    { symbol: "MSFT", price: 40.49, priceChange: 0.33, percentChange: 0.82 }
            //];
        },
        setPriceData: function() {
            var that = this;
            this.forEach(function(quote) {
                var quotePrice = _.find(that.priceData, function (price) {
                    return price.symbol == quote.get('id');
                });
                if (quotePrice) {
                    quote.set(quotePrice); //todo: revise this
                }
            });
            this.trigger('quotes:priceSet');
        }
    });
    StockMachine.quotes = new StockMachine.Quotes();
}());