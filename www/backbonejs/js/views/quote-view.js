define([
    'underscore',
    'backbone',
    'text!templates/quote.template'
    ], function(_, Backbone, quoteTmpl) {
        'use strict';

        // Single quote view
        var QuoteView = Backbone.View.extend({
            tagName: 'tr',
            template: _.template(quoteTmpl),
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
        return QuoteView;
    }
);
