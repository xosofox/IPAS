var ResonatorDetailView = Backbone.View.extend({
    tagName: "td",
    className: "resoInfo",
    model: Resonator,
    position: "N",
    initialize: function (args) {
        this.listenTo(this.model, "change", this.render);
        this.template=_.template(ResonatorDetailViewTemplate);
        //_bindAll(this,"incLevel","decLevel"
    },
    events: {
        "click .arrow-up": "incLevel",
        "click .arrow-down": "decLevel"
    },
    incLevel: function () {
        var level = this.model.get("level");
        if (level<8) {
            this.model.set("level",level+1);
        }
        portal.fill();
    },
    decLevel: function () {
        var level = this.model.get("level");
        if (level>1) {
            this.model.set("level",level-1);
        }
        portal.fill();
    },
    render: function () {
        var level = this.model.get("level");
        var perc = this.model.getPercentage();
        if (perc <= 0) {
            perc = .1;
        }
        var data = this.model.toJSON();
        data.perc=perc;
        data.levelcolor=level_color[level-1];
        this.$el.html(this.template(data));
        return this;
    }
});

var ResonatorDetailViewTemplate = '\
        <div style="position: relative; height: 30px">\
            <div style="position: absolute; left:0 ; top:0"><%- level %></div>\
            <div style="position: absolute; left: 10px; width: 50px; border: 1px solid gray">\
                <span style="width: <%- perc %>%; background-color: <%- levelcolor %>; display: block" >&nbsp;</span>\
            </div>\
            <div style="position: absolute; left: 70px">\
                <div class="arrow-up"></div>\
                <div class="arrow-down"></div>\
            </div>\
        </div>\
        ';

