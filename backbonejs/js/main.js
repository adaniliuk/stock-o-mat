$(function() {
	var Quote = Backbone.Model.extend({
		defaults: function() {
			return {
				symbol: '',
				price: 0,
				priceChange: 0,
				percentChange: 0
			};
		}
	});

	var defaultQuotes = [
		new Quote({symbol: "GOOG", price: 1157.93, priceChange: -25.11, percentChange: -2.12}),
		new Quote({symbol: "FB", price: 64.10, priceChange: -3.14, percentChange: -4.67}),
		new Quote({symbol: "EPAM", price: 32.12, priceChange: -0.32, percentChange: -0.99}),
		new Quote({symbol: "MSFT", price: 40.49, priceChange: 0.33, percentChange: 0.82})
	];

	var Quotes = Backbone.Collection.extend({
		model: Quote,
		updatedAgo: 0,
    localStorage: new Backbone.LocalStorage('stock-o-mat-quotes')
	});
  var quotes = new Quotes();
	quotes.set(defaultQuotes);

	var QuotesView = Backbone.View.extend({
		el: '#quotes',
		render: function() {
      var template = _.template($('#quotes-list-template').html(), {quotes: quotes.models});
			this.$el.html(template);
      return this;
		},
    initialize: function() {
      this.listenTo(quotes, 'change, add', this.render);
    }
	});
	var quotesView = new QuotesView();

  var AppView = Backbone.View.extend({
    el: 'div#quotesApp',
    symbolInput: $('input#symbolText'),
    events: {
      'submit #addSymbolForm': 'addSymbolFormSubmitted'
    },
    addSymbolFormSubmitted: function(ev) {
      var symbol = this.symbolInput.val();
      this.addQuote(symbol);
      this.symbolInput.val('');
      return false;
    },
    addQuote: function(symbol) {
      var quote = new Quote({symbol: symbol});
      quotes.push(quote);
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
		quotesView.render();
	});
	Backbone.history.start();

});
