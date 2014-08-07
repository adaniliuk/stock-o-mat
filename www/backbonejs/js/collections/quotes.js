define([
    'jquery',
    'underscore',
    'backbone',
    'localStorage',
    'models/quote'], function($, _, Backbone, LocalStorage, Quote) {
        'use strict';

        // Quotes collection
        var Quotes = Backbone.Collection.extend({
            model: Quote,
            // Local Storage is required to keep symbols list persistent
            localStorage: new LocalStorage('stock-o-mat-quotes'),
            initialize: function () {
                this.on('reset', this.fetchPriceData);
                this.on('add', this.fetchPriceData);
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
                this.priceData.forEach(function(price) {
                    var quote = this.findWhere({ id: price.symbol });
                    if (quote) {
                        quote.set(price, { silent:true });
                    }
                }, this);
                this.trigger('quotes:priceSet');
            }
        });
        return new Quotes();
    }
);
