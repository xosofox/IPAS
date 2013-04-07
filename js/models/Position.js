var Position = Backbone.Model.extend({
    //holds the latest cursor position
    defaults: {
        x: 0,
        y: 0
    },
    initialize: function () {
        _.bindAll(this, "update");
    },
    update: function (el, x, y) {
        var e = el.currentTarget;
        if (typeof e.offsetX === "undefined" || typeof e.offsetY === "undefined") {
            var targetOffset = $(e).offset();
            e.offsetX = targetOffset.left;
            e.offsetY = targetOffset.top;
        }
        x = x - e.offsetX;
        y = y - e.offsetY;
        this.set({x: x, y: y}, {silent: true});
    }
});
