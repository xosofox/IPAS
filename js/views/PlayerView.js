var PlayerView = Backbone.View.extend({
    model: Player,
    initialize: function () {
        _.bindAll(this, "render", "show", "hide");
        this.width = 28;
        this.height = 34;
        this.raphael = paper.image("images/player.png", 0, 0, this.width, this.height);
        this.offsetX = this.width / 2;
        this.offsetY = this.height / 2;
        this.hide();
    },
    hide: function () {
        this.raphael.hide();
    },
    show: function () {
        this.raphael.show();
    },
    render: function () {
        var x = this.model.get("x") - this.offsetX;
        var y = this.model.get("y") - this.offsetY;
        this.raphael.animate({"x": x, y: y}).show().toFront();
    }
});
