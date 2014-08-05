// todo:
// display updated ago time (should take into account market status)
// review all todo(s) at frontend and backend
// add rearrange quotes option
// fix styles
// add require.js support
// separate templates
// build js
// add unit tests
// build deployment package
// little bit too slow on load and new quote addition
// add load spinner?
// deploy (check github, heroku, etc)
// add some default set of options
// add ticker lookup function

var StockMachine = StockMachine || {};

$(function() {
    'use strict';

    new StockMachine.AppView();
});
