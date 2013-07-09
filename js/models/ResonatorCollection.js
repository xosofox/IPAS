var ResonatorCollection = Backbone.Collection.extend({
    model: Resonator,
    initialize: function () {
        for (var i = 0; i < 8; i++) {
            this.add({});
        }
    }

});
