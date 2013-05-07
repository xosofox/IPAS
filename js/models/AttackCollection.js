var AttackCollection = Backbone.Collection.extend({
    model: Attack,
    add: function(model, options) {
        // attack.attack();
        return Backbone.Collection.prototype.add.call(this, model, options);
    },
    pop: function(options) {
        var popd = Backbone.Collection.prototype.pop.call(this, options);
        popd.undoDamage();
        return popd;
    }
});
