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
        "click .level-up": "incLevel",
        "click .level-down": "decLevel",
        "click .distance-up": "incDist",
        "click .distance-down": "decDist",
        "mouseover .resoLevel": "highlight",
        "mouseout .resoLevel": "unhighlight"
    },
    incLevel: function () {
        var level = this.model.get("level");
        if (level<8) {
            this.model.set({"level":level+1,"energyTotal":1}); //set energy >0 to force the reso to be reloaded
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
    incDist: function() {
        var d = this.model.get("distanceToPortal");
        if (d<40) {
            d++;
            if (EQUIDISTANT) {
                resonators.invoke("set", {"distanceToPortal": d });
            } else {
                this.model.set("distanceToPortal", d);
            }
        }
    },
    decDist: function() {
        var d = this.model.get("distanceToPortal");
        if (d>1) {
            d--;
            if (EQUIDISTANT) {
                resonators.invoke("set", {"distanceToPortal": d });
            } else {
                this.model.set("distanceToPortal", d);
            }
        }
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
            <div class="resoLevel" style="position: absolute; left: 0px; width: 60px; border: 1px solid gray">\
                <span style="width: <%- perc %>%; background-color: <%- levelcolor %>; display: block" >&nbsp;</span>\
            </div>\
            <div style="position: absolute; left:27px ; top:0; z-index: 20; color: <% if (level <3) { %>#000000<% } else { %>white<% } %>"><%- level %></div>\
            <div style="position: absolute; left: 65px">\
                <div class="arrow-up level-up" title="Level up"></div>\
                <div class="arrow-down level-down" title="Level down"></div>\
            </div>\
            <div style="position: absolute; left:92px" class="distance"><%- distanceToPortal %>m</div>\
            <div style="position: absolute; left: 123px">\
                <div class="arrow-up distance-up" title="Distance up"></div>\
                <div class="arrow-down distance-down" title="Distance down"></div>\
            </div>\
        </div>\
        ';

