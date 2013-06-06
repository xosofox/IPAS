var ModView = Backbone.View.extend({
    tagName: "td",
    className: "modInfoCell",
    model: Mod,
    initialize: function (args) {
        //this.listenTo(this.model, "change", this.render);
        this.template=_.template(ModTemplate);
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
        data.title = MOD_TITLE[this.model.get("shortType")];
    data.color = MOD_COLOR[this.model.get("shortType")];
        this.$el.html(this.template(data));
        return this;
    }
});

var ModTemplate = '\
<td align="center" style="height: 60px; width: 60px; border: 1px solid white">\
        <span style="font-size: 8pt; color: <%- color %>"><%- title %></span>\
</td>\
        ';

