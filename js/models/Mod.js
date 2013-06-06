var Mod = Backbone.Model.extend({
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
        var i=_.indexOf(MOD_TYPES,this.get("shortType"));
        i++;
        i=i%MOD_TYPES.length;
        this.setType(MOD_TYPES[i]);
    },
    setType: function(shortType) {
        this.set("shortType",shortType);
        this.set("mitigation",MOD_MITIGATION[shortType]);
    },
    getDeployCost: function() {
        return mod_deploy_cost[this.get("shortType")];
    }

});

