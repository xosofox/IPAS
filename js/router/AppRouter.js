var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'home',
        'index.html': 'home',
        '*confighash': 'loadconfig'
    },
    home: function () {
    },
    loadconfig: function (confighash) {
        portal.loadFromConfigHash(confighash)
    }
});