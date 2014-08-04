var StockMachine = StockMachine || {};

(function() {
    'use strict';

    // Single quote view
    StockMachine.QuoteView = Backbone.View.extend({
        tagName: 'tr',
        template: _.template($('#quote-template').html()),
        events: {
            'click .delete': 'deleteQuote'
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        deleteQuote: function() {
            this.model.destroy();
            this.remove();
        }
    });
}());