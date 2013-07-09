var ModView = Backbone.View.extend({
    tagName: "td",
    className: "modInfoCell",
    model: Mod,
    initialize: function (args) {
        //this.listenTo(this.model, "change", this.render);
        this.template = _.template(ModTemplate);
        //_bindAll(this,"incLevel","decLevel"
    },
    events: {
        "click": "cycle"
    },
    cycle: function () {
        this.model.cycle();
    },
    render: function () {
        var data = this.model.toJSON;
        data.title = MOD_TYPES[this.model.get("modType")];
        if (this.model.get("modType") != "-") {
            data.title += " (" + MOD_RARITIES[this.model.get("rarity")] + ")";
        }

        data.color = MOD_RARITY_COLOR[this.model.get("rarity")];
        this.$el.html(this.template(data));
        return this;
    }
});

var ModTemplate = '\
<td align="center" style="height: 60px; width: 60px; border: 1px solid white">\
        <span style="font-size: 8pt; color: <%- color %>"><%- title %></span>\
</td>\
        ';

