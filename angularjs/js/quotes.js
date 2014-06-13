function Quote(symbol, price, priceChange, percentChange) {
    this.symbol = symbol;
    this.price = price;
    this.priceChange = priceChange;
    this.percentChange = percentChange;
}
Quote.prototype.symbol = "";
Quote.prototype.price = 0;
Quote.prototype.priceChange = 0;
Quote.prototype.percentChange = 0;

function QuotesController($scope, $http) {
    $scope.quotes = [
        new Quote("GOOG", 1157.93, -25.11, -2.12),
        new Quote("FB", 64.10, -3.14, -4.67),
        new Quote("EPAM", 32.12, -0.32, -0.99),
        new Quote("MSFT", 40.49, 0.33, 0.82)
    ];


    $scope.updated = function() {
        return 15;
    };

    $scope.getPriceStyle = function(quote) {
        if (quote.priceChange >= 0) {
            return "numeric text-success";
        } else {
            return "numeric text-danger";
        }
    };

    $scope.addQuote = function() {
        if (isValidSymbol($scope.symbolText)) {
            $scope.quotes.push(new Quote($scope.symbolText, 0, 0, 0));
            $scope.symbolText = "";
            retrieveQuotesData();
        }
    };

    function retrieveQuotesData() {
        // todo: proxy service is required
        var requestTemplate = "http://finance.yahoo.com/d/quotes.csv?s={symbols}&f=sl1c1p2";
        var symbols = "";
        for (var i = 0; i < $scope.quotes.length; i++) {
            symbols += (i !== 0 ? "+" : "") + $scope.quotes[i].symbol;
        }

        if (symbols.length > 0) {
            var requestUrl = requestTemplate.replace("{symbols}", symbols);

            $http({method: 'GET', url: requestUrl}).
                success(function(data, status, headers, config) {
                    alert(data);
                    // this callback will be called asynchronously
                    // when the response is available
                }).
                error(function(data, status, headers, config) {
                    alert(status);
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }
    }
}

function isValidSymbol(symbol) {
    // todo: add ticker symbol regexp matching and check against duplication
    return true;
}



