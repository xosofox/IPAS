var ShieldList = Backbone.View.extend({
    initialize: function () {
        this.render();
    },
    collection: ShieldCollection,
    events: {
    },
    render: function () {
        var tr=$('tr');
        //render in same order as IITC
        this.collection.each(function (shield) {
            var sv = new ShieldView({
                model: shield,
            });
            sv.render();
            tr.append(sv.el);
        });
        this.$el.append(tr);
    }
});
