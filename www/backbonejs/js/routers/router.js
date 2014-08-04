var StockMachine = StockMachine || {};

(function() {
    'use strict';

    // Main app router
    StockMachine.Router = Backbone.Router.extend({
        routes: {
            '': 'home'
        },
        home: function(){}
    });
    StockMachine.router = new StockMachine.Router();
    Backbone.history.start();
}());