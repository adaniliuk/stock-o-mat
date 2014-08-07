// todo:
// build js (bundle, minify)
// build deployment package
// add unit tests
// little bit too slow on load and new quote addition
// add load spinner?
// display error panel if something happens
// deploy (check github pages, heroku, etc)
// add some default quotes set
// add rearrange quotes option
// add ticker lookup function
// display updated ago time taking into account market status

require.config({
    paths: {
        'jquery': 'libs/jquery.min',
        'underscore': 'libs/underscore-min',
        'backbone': 'libs/backbone-min',
        'localStorage': 'libs/backbone.localStorage-min',
        'text': 'libs/text',
        'moment': 'libs/moment.min'
    }
});

require(['views/app-view', 'collections/quotes'], function(AppView, quotes) {
    var appView = new AppView({
        collection: quotes
    });
});
