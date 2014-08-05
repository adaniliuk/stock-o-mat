var StockMachine = StockMachine || {};

(function() {
    'use strict';

    // Main application view
    StockMachine.AppView = Backbone.View.extend({
        el: '#quotesApp',
        events: {
            'submit #addSymbolForm': 'symbolSubmitted',
            'click .refresh': 'fetchQuotes',
            'click .options': 'toggleDelete'
        },
        initialize: function() {
            this.$quotes = $('#quotes');
            this.$statsBlock = $('#quotesStats');
            this.statsTemplate = _.template($('#stats-template').html());
            this.$symbolInput = $('#symbolText');

            this.deleteDisplayed = false; // defines current delete buttons visibility

            this.listenTo(StockMachine.quotes, 'quotes:priceSet', this.updateQuotes);
            this.listenTo(StockMachine.quotes, 'quotes:priceSet', this.render);

            this.fetchQuotes();
            this.quotesIntervalId = window.setInterval(this.fetchQuotes, 60000); //todo: 1min, move to config
            this.statsIntervalId = window.setInterval(this.updateStatistics, 8000, this); //todo: 8seconds, move to config
        },
        fetchQuotes: function() {
            StockMachine.quotes.fetch({ reset: true });
        },
        render: function() {
            this.updateStatistics(this);
            return this;
        },
        addQuoteView: function(quote) {
            var view = new StockMachine.QuoteView({
                model: quote,
                deleteDisplayed: this.deleteDisplayed
            });
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
        },
        toggleDelete: function() {
            this.deleteDisplayed = !this.deleteDisplayed;
            $('.delete').toggleClass('hidden');
        }
    });
}());