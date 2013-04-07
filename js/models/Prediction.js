var Prediction = Backbone.Model.extend({
    model: Attack,
    defaults: {
        state: false,
        maxDamage: 0,
        maxX: 0,
        maxY: 0
    },
    initialize: function () {
        //listen level change, reset max
    }
});

