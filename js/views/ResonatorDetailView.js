var ResonatorDetailView = Backbone.View.extend({
    tagName: "td",
    className: "resoInfoCell",
    model: Resonator,
    position: "N",
    initialize: function (args) {
        this.listenTo(this.model, "change", this.render);
        this.template=_.template(ResonatorDetailViewTemplate);
        //_bindAll(this,"incLevel","decLevel"
    },
    events: {
        "click .arrow-up": "incLevel",
        "click .arrow-down": "decLevel",
        "mouseover .resoInfo": "highlight",
        "mouseout .resoInfo": "unhighlight"
    },
    incLevel: function () {
        var level = this.model.get("level");
        if (level<8) {
            this.model.set("level",level+1);
        }
        portal.commit();
    },
    decLevel: function () {
        var level = this.model.get("level");
        if (level<=0) {
            return false;
        }

        if (level==1) {
            this.model.set("energyTotal",0);
            this.model.set("level",0);
        } else {
            this.model.set("level",level-1);
        }
        portal.commit();
    },
    highlight: function (e) {
        this.model.set("highlight",true)
    },
    unhighlight: function(e) {
        this.model.set("highlight",false);
    },
    render: function () {
        var level = this.model.get("level");
        var perc = this.model.getPercentage();
        if (perc <= 0) {
            perc = .1;
        }
        var data = this.model.toJSON();
        data.perc=perc;
        data.levelcolor=level_color[level];
        if (this.model.get("highlight")) {
            data.highlightclass="highlight";
        } else {
            data.highlightclass="";
        }
        this.$el.html(this.template(data));
        return this;
    }
});

var ResonatorDetailViewTemplate = '\
        <div class="resoInfo <%- highlightclass  %>" style="position: relative; height: 30px; margin: 2px">\
            <div style="position: absolute; left:27px ; top:0; z-index: 20; color: <% if (level <3) { %>#000000<% } else { %>white<% } %>"><%- level %></div>\
            <div style="position: absolute; left: 0px; width: 60px; border: 1px solid gray">\
                <span style="width: <%- perc %>%; background-color: <%- levelcolor %>; display: block" >&nbsp;</span>\
            </div>\
            <div style="position: absolute; left: 70px">\
                <div class="arrow-up" title="Level up"></div>\
                <div class="arrow-down" title="Level down"></div>\
            </div>\
            <div style="position: absolute; left:95px" class="distance"><%- distanceToPortal %>m</div>\
        </div>\
        ';

