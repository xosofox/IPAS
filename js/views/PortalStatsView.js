var PortalStatsView = Backbone.View.extend({
    model: Portal,
    initialize: function () {
        this.listenTo(this.model, "change", this.render)
        this.listenTo(this.model.mods, "add remove change", this.render)
        this.listenTo(this.model.links, "add remove change", this.render)
        this.template=_.template(PortalStatsTemplate);
        this.$el.html(this.template());
        this.render();
    },
    render: function () {
        var totMit = this.model.totalMitigation();
        var text= totMit;
        if (totMit==95) {
            text += " (max)";
        }
        $('#totalMitigation').text(text);
    }
});

var PortalStatsTemplate = '\
    Total mitigation: <span id="totalMitigation">0</span><br />\
    Supported link length: <span id="linkLenght">0</span><br />\
';
