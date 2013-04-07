var AttackListView = Backbone.View.extend({
    initialize: function () {
        _.bindAll(this, "addOne", "render");
        this.listenTo(this.collection, "add", this.addOne);
        this.listenTo(this.collection, "reset", this.render)
    },
    addOne: function (at) {
        var av = new AttackInfoView({
            model: at
        });
        this.$el.append(av.render().el);
    },
    render: function () {
        this.$el.html("");
        this.collection.each(function (at, i) {
            this.addOne(at);
        });
    }
});