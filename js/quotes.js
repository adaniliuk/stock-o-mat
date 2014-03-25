function QuotesController($scope) {
    $scope.quotes = [
        {symbol: "GOOG", price: 1157.93, priceChange: -25.11, percentChange: -2.12},
        {symbol: "FB", price: 64.10, priceChange: -3.14, percentChange: -4.67},
        {symbol: "EPAM", price: 32.12, priceChange: -0.32, percentChange: -0.99},
        {symbol: "MSFT", price: 40.49, priceChange: 0.33, percentChange: 0.82}
    ];

    $scope.getPriceStyle = function(quote) {
        if (quote.priceChange >= 0) {
            return "numeric text-success";
        } else {
            return "numeric text-danger";
        }
    };

    $scope.updated = function () {
        return 15;
    };

    $scope.addQuote = function () {
        $scope.quotes.push(
            {
                symbol: $scope.symbolText, price: 0, priceChange: 0, percentChange: 0
            }
        );
        $scope.symbolText = "";
    };
}