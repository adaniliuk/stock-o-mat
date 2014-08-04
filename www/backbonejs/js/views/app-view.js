var StockMachine = StockMachine || {};

(function() {
    'use strict';

    // Main application view
    StockMachine.AppView = Backbone.View.extend({
        el: '#quotesApp',
        events: {
            'submit #addSymbolForm': 'symbolSubmitted'
        },
        initialize: function() {
            this.$quotes = $('#quotes');
            this.$statsBlock = $('#quotesStats');
            this.statsTemplate = _.template($('#stats-template').html());
            this.$symbolInput = $('#symbolText');

            this.listenTo(StockMachine.quotes, 'quotes:priceSet', this.updateQuotes);
            this.listenTo(StockMachine.quotes, 'quotes:priceSet', this.render);

            this.fetchQuotes();
            this.quotesIntervalId = window.setInterval(this.fetchQuotes, 600000); //todo: 1min, move to config
            this.statsIntervalId = window.setInterval(this.updateStatistics, 15000, this); //todo: 15seconds, move to config
        },
        fetchQuotes: function() {
            StockMachine.quotes.fetch({ reset: true });
        },
        render: function() {
            this.updateStatistics(this);
            return this;
        },
        addQuoteView: function(quote) {
            var view = new StockMachine.QuoteView({ model: quote });
            this.$quotes.append(view.render().el);
        },
        updateQuotes: function() {
            this.lastUpdated = Date.now();
            this.$quotes.html('');
            StockMachine.quotes.each(this.addQuoteView, this);
        },
        updateStatistics: function(that) {
            //render statistics (e.g. updated ago time)
            var currentTime = Date.now();
            var lastUpdatedTime = that.lastUpdated || currentTime;
            var elapsed = Math.ceil((currentTime - lastUpdatedTime) / 1000); // in seconds

            that.$statsBlock.html(that.statsTemplate({
                elapsed: elapsed,
                lastUpdatedTime: lastUpdatedTime
            }));
        },
        symbolSubmitted: function (ev) {
            var symbol = this.$symbolInput.val().trim();
            if (!symbol) return;

            if (this.addNewQuote(symbol)) {
                this.$symbolInput.val('');
            }
            return false; // return false so form is not submitted
        },
        addNewQuote: function (symbol) {
            return StockMachine.quotes.create({ id: symbol });
        }
    });
}());