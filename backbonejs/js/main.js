$(function() {
  // Quote model
	var Quote = Backbone.Model.extend({
		defaults: function() {
			return {
				price: 0,
				priceChange: 0,
				percentChange: 0
			};
		},
    validate: function(attrs, options) {
      // todo: add validation against symbol format
      // todo: add validation to check if symbol is real
      if (!attrs.id) { // id is presented by quote symbol, e.g. GOOG
        return 'Symbol cannot be empty!';
      }
    }
	});

  // default quotes - dev only
	var defaultQuotes = [
		new Quote({id: "GOOG", price: 1157.93, priceChange: -25.11, percentChange: -2.12}),
		new Quote({id: "FB", price: 64.10, priceChange: -3.14, percentChange: -4.67}),
		new Quote({id: "EPAM", price: 32.12, priceChange: -0.32, percentChange: -0.99}),
		new Quote({id: "MSFT", price: 40.49, priceChange: 0.33, percentChange: 0.82})
	];

  // Quotes collection
	var Quotes = Backbone.Collection.extend({
		model: Quote,
		updateTime: null,
    localStorage: new Backbone.LocalStorage('stock-o-mat-quotes'),
	});
  var quotes = new Quotes();

  // Quotes list view
	var QuotesView = Backbone.View.extend({
		el: '#quotes',
    template: _.template($('#quotes-list-template').html()),
		render: function() {
			this.$el.html(this.template({quotes: quotes.models}));
      return this;
		},
    initialize: function() {
      // todo: it's not good that the full collection is rendered
      // on each kind of change event, refactor that
      this.listenTo(quotes, 'sync', this.render);
    }
	});
	var quotesView = new QuotesView();

  // Main application view
  var AppView = Backbone.View.extend({
    el: '#quotesApp',
    symbolInput: $('#symbolText'),
    events: {
      'submit #addSymbolForm': 'addSymbolFormSubmitted'
    },
    addSymbolFormSubmitted: function(ev) {
      var symbol = this.symbolInput.val();
      if (this.addQuote(symbol)) {
        this.symbolInput.val('');
      }
      return false; // return false so form is not submitted
    },
    addQuote: function(symbol) {
      return quotes.create({id: symbol});
    },
  });
  var appView = new AppView();

	var Router = Backbone.Router.extend({
		routes: {
			'': 'home'
		}
	});
	var router = new Router();
	router.on('route:home', function() {
    quotes.fetch();
	});
	Backbone.history.start();
});
