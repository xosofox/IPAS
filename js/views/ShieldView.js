var ShieldView = Backbone.View.extend({
    tagName: "td",
    className: "shieldInfoCell",
    model: Shield,
    initialize: function (args) {
        //this.listenTo(this.model, "change", this.render);
        this.template=_.template(ShieldTemplate);
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
        data.title = SHIELD_TITLE[this.model.get("short")];
        data.color = SHIELD_COLOR[this.model.get("short")];
        this.$el.html(this.template(data));
        return this;
    }
});

var ShieldTemplate = '\
<td align="center" style="height: 40px; width: 40px; border: 1px solid white">\
        <span style="font-size: 8pt; color: <%- color %>"><%- title %></span>\
</td>\
        ';

