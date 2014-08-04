var StockMachine = StockMachine || {};

$(function() {
    'use strict';

    var styleConfig = {
        colorStyle: {
            positive: 'text-success',
            negative: 'text-danger'
        }
    };

    StockMachine.Html = StockMachine.Html || {};

    StockMachine.Html.getPriceStyle = function(change) {
        if (change >= 0) {
            return styleConfig.colorStyle.positive;
        } else {
            return styleConfig.colorStyle.negative;
        }
    }

    StockMachine.Html.htmlEncode = function(value) {
        return $('<div/>').text(value).html();
    }
}());