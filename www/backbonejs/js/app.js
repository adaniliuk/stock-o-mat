// todo:
// update quotes every 1? minute (should be configurable)
// add remove quote(s) option
// add rerrange quotes option
// display updated ago time (should take into account market status)
// revise errors handling strategy
// review all todo(s) at frontend and backend
// little bit too slow on load and new quote addition
// add load spinner?
// fix styles
// add require.js support
// separate templates
// build js
// add unit tests
// build deployment package
// deploy (check github, heroku, etc)

var StockMachine = StockMachine || {};

$(function() {
    'use strict';

    new StockMachine.QuotesView();
});
