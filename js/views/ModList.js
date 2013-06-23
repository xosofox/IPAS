var ModList = Backbone.View.extend({
    collection: ModCollection,
    initialize: function () {
        this.listenTo(this.collection,"change",this.render);
        this.render();
    },
    events: {
    },
    render: function () {
        var tr=$('<tr></tr>');
        //render in same order as IITC
        this.collection.each(function (mod) {
            var sv = new ModView({
                model: mod
            });
            sv.render();
            tr.append(sv.el);
        });
        this.$el.html(tr);
        $('#modMitigation').text(this.collection.modMitigation());
    }
});
