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
        initialize: function(options) {
            this.options = options || {};
        },
        render: function () {
            var templateData = {
                quote: this.model.toJSON(),
                options: {
                    deleteDisplayed: this.options.deleteDisplayed
                }
            };
            this.$el.html(this.template(templateData));
            return this;
        },
        deleteQuote: function() {
            this.model.destroy({ silent: true });
            this.remove();
        }
    });
}());