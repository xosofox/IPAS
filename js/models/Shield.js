var Shield = Backbone.Model.extend({
	defaults: {
        short: "-",
        mitigation: 0
    },
    initialize: function(short) {
        if (typeof short !== "undefined") {
            short="-";
        }
        this.setType(short);
    },
    cycle: function() {
        var i=_.indexOf(SHIELD_TYPES,this.get("short"));
        i++;
        i=i%4;
        this.setType(SHIELD_TYPES[i]);
    },
    setType: function(short) {
        this.set("short",short);
        this.set("mitigation",SHIELD_MITIGATION[short]);
    }
});

