var Link = Backbone.Model.extend({
    defaults: {
        distance: 1,
        active: true,
        isOrigin: true
    },
    initialize: function (d) {
        this.set("distance", d)
        if (d < 0) {
            this.set("isOrigin", false);
        }
    }
});

