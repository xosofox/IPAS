var ShieldList = Backbone.View.extend({
    collection: ShieldCollection,
    initialize: function () {
        this.listenTo(this.collection,"change",this.render);
        this.render();
    },
    events: {
    },
    render: function () {
        var tr=$('<tr></tr>');
        //render in same order as IITC
        this.collection.each(function (shield) {
            var sv = new ShieldView({
                model: shield
            });
            sv.render();
            tr.append(sv.el);
        });
        this.$el.html(tr);
    }
});
