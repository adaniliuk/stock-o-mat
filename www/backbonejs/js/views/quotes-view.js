var StockMachine = StockMachine || {};

(function() {
    'use strict';

    // Main application view
    StockMachine.QuotesView = Backbone.View.extend({
        el: '#quotesApp',
        events: {
            'submit #addSymbolForm': 'symbolSubmitted'
        },
        initialize: function() {
            this.$quotes = $('#quotes');
            this.$symbolInput = $('#symbolText');

            this.listenTo(StockMachine.quotes, 'quotes:priceSet', this.addAllQuoteViews);

            StockMachine.quotes.fetch({ reset: true });
        },
        render: function () {
            //todo: render statistics (e.g. updated ago time)
        },
        addQuoteView: function(quote) {
            var view = new StockMachine.QuoteView({ model: quote });
            this.$quotes.append(view.render().el);
        },
        addAllQuoteViews: function() {
            this.$quotes.html('');
            StockMachine.quotes.each(this.addQuoteView, this);
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