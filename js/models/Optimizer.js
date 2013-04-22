var Optimizer = Backbone.Model.extend({
    defaults: {
        x: 0,
        y:0,
        matrix:{}
    },
    optimize: function () {

    },
    getDamage: function (x,y) {

    },
    setDamage: function(x,y,dmg) {

    },
    calculateSurroundings: function () {

    },
    show: function () {
        player.set({x: this.get("x"),y: this.get("y")});
        playerView.show();
    }
});