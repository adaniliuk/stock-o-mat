$(function() {
  // todo:
  // get data from yahoo finance api
  // update quotes every 1? minute (should be configurable)
  // add remove quote(s) option
  // add rerrange quotes option
  // display updated ago time (should take into account market status)
  // revise errors handling strategy
  // review all todo(s)
  // fix styles
  // separate js files
  // add require.js support
  // separate templates
  // build js
  // add unit tests
  // build deployment package
  // deploy (check github, heroku, etc)

  // Quote model
	var Quote = Backbone.Model.extend({
    idAttribute: 'symbol',
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

  // Quotes collection
	var Quotes = Backbone.Collection.extend({
		model: Quote,
		updateTime: null,
    // Local Storage is required to keep symbols list persistent
    localStorage: new Backbone.LocalStorage('stock-o-mat-quotes'),
    fetchPriceData: function() {
      var symbols = this.pluck('id'),
          priceData = this.fetchPriceDataFromServer(symbols);

      this.forEach(function(quote) {
        var quotePrice = _.find(priceData, function(price) {
          return price.id == quote.id;
        });
        quote.set(quotePrice);
      });

      this.trigger('syncPrice');
    },
    fetchPriceDataFromServer: function(symbols) {
      var that = this,
          sParam = symbols.join('+');
          url = 'http://finance.yahoo.com/d/quotes.csv?s=' + sParam + '&f=sl1c1p2';
          priceData = [];
      // todo: add server call
      /*

      $.getJSON(url).
        done(function() {
          // prepare price data array here and then return it
          that.updateTime = new Date();
        });
      */

      // temporary return test data
      priceData = [
        {id: "GOOG", price: 1157.93, priceChange: -25.11, percentChange: -2.12},
        {id: "FB", price: 64.10, priceChange: -3.14, percentChange: -4.67},
        {id: "EPAM", price: 32.12, priceChange: -0.32, percentChange: -0.99},
        {id: "MSFT", price: 40.49, priceChange: 0.33, percentChange: 0.82}
      ];

      return priceData;
    },
    dlNos: function() {
      alert(JSON.stringify(arguments));
    },
    initialize: function() {
      this.on('sync', this.fetchPriceData);
      //this.on('all', this.dlNos);
    }
	});
  var quotes = new Quotes();

  // Quotes list view
	var QuotesView = Backbone.View.extend({
		el: '#quotes',
    template: _.template($('#quotes-list-template').html()),
		render: function() {
      //alert('quotesview render call');
      this.$el.empty();
			this.$el.html(this.template({quotes: this.collection.models}));
		},
    initialize: function() {
      this.listenTo(this.collection, 'syncPrice', this.render);
    }
	});
	var quotesView = new QuotesView({collection: quotes});

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
