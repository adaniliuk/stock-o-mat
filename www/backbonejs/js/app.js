// todo:
// fix styles
// add require.js support
// separate templates
// build js
// add unit tests
// build deployment package
// little bit too slow on load and new quote addition
// add load spinner?
// display error panel if something happens
// deploy (check github, heroku, etc)
// add some default quotes set
// add rearrange quotes option
// add ticker lookup function
// display updated ago time taking into account market status

var StockMachine = StockMachine || {};

$(function() {
    'use strict';

    new StockMachine.AppView();
});
