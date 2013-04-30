var Shield = Backbone.Model.extend({
	defaults: {
        shortType: "-",
        mitigation: 0
    },
    initialize: function(shortType) {
        if (typeof shortType !== "undefined") {
            shortType="-";
        }
        this.setType(shortType);
    },
    cycle: function() {
        var i=_.indexOf(SHIELD_TYPES,this.get("shortType"));
        i++;
        i=i%4;
        this.setType(SHIELD_TYPES[i]);
    },
    setType: function(shortType) {
        this.set("shortType",shortType);
        this.set("mitigation",SHIELD_MITIGATION[shortType]);
    }
});

