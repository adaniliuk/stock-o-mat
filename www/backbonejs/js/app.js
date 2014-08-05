// todo:
// add remove quote(s) option
// add refresh option
// do not reload full list on each remove action
// do not reload full list on each add action - load only added ticker price
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
// add ticker lookup function

var StockMachine = StockMachine || {};

$(function() {
    'use strict';

    new StockMachine.AppView();
});
