var BursterRangeView = Backbone.View.extend({
    initialize: function () {
        _.bindAll(this, "render", "show", "hide");
        this.raphael = paper.circle(0, 0, mInPx(42)).hide();
        border.mouseover(this.show);
        border.mouseout(this.hide);
        border.mousemove(this.render);
        this.listenTo(attackSetup, "change level", this.range);
    },
    range: function () {
        var level = attackSetup.get("level");
        this.raphael.attr("r", mInPx(burster_range[level - 1]));
    },
    hide: function () {
        this.raphael.hide();
    },
    show: function () {
        this.raphael.show();
    },
    render: function () {
        var x = position.get("x");
        var y = position.get("y");
        this.raphael.attr({"cx": x, "cy": y});
    }
});
