define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'views/quote-view',
    'text!templates/stats.template'
    ], function($, _, Backbone, moment, QuoteView, statsTmpl) {
        'use strict';

        // Main application view
        var AppView = Backbone.View.extend({
            el: '#quotesApp',
            events: {
                'submit #addSymbolForm': 'symbolSubmitted',
                'click .refresh': 'refreshQuotes',
                'click .options': 'toggleDelete'
            },
            initialize: function() {
                var that = this;

                this.$quotes = $('#quotes');
                this.$statsBlock = $('#quotesStats');
                this.statsTemplate = _.template(statsTmpl);
                this.$symbolInput = $('#symbolText');

                this.deleteDisplayed = false; // defines current delete buttons visibility

                this.listenTo(this.collection, 'quotes:priceSet', this.render);

                this.fetchQuotes();

                this.quotesIntervalId = window.setInterval(function() {
                    that.fetchQuotes.call(that);
                }, 60000); // 1 minute
                this.statsIntervalId = window.setInterval(function() {
                    that.updateStatistics.call(that);
                }, 5000); // 5 seconds
            },
            fetchQuotes: function() {
                this.collection.fetch({ reset: true });
            },
            render: function() {
                this.updateQuotes();
                this.updateStatistics();
                return this;
            },
            addQuoteView: function(quote) {
                var view = new QuoteView({
                    model: quote,
                    deleteDisplayed: this.deleteDisplayed
                });
                this.$quotes.append(view.render().el);
            },
            updateQuotes: function() {
                this.lastUpdated = Date.now();
                this.$quotes.html('');
                this.collection.each(this.addQuoteView, this);
            },
            updateStatistics: function() {
                //render statistics (e.g. updated ago time)
                var lastUpdatedTime = this.lastUpdated;
                if (lastUpdatedTime) {
                    var currentTime = Date.now();
                    var elapsed = Math.ceil((currentTime - lastUpdatedTime) / 1000); // in seconds

                    this.$statsBlock.html(this.statsTemplate({
                        elapsed: elapsed,
                        lastUpdatedTime: lastUpdatedTime,
                        momentApi: moment
                    }));
                }
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
                return this.collection.create({ id: symbol }, { validate: true });
            },
            toggleDelete: function(ev) {
                this.deleteDisplayed = !this.deleteDisplayed;
                $('.delete').toggleClass('hidden');
                ev.preventDefault();
            },
            refreshQuotes: function(ev) {
                this.fetchQuotes();
                ev.preventDefault();
            }
        });
        return AppView;
    }
);
