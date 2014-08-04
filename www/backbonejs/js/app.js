// todo:
// display updated ago time (should take into account market status)
// add remove quote(s) option
// add rearrange quotes option
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
// add ticker lookup function

var StockMachine = StockMachine || {};

$(function() {
    'use strict';

    new StockMachine.AppView();
});
