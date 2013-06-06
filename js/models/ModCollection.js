var ModCollection = Backbone.Collection.extend({
	model: Mod,
    initialize: function() {
        _.bindAll(this,"mitigations","totalMitigation");
        //add 4 slots
        for (var i=0;i<4;i++) {
            this.add({});
        }
    },
    mitigations: function () {
        return this.pluck("mitigation");
    },
    totalMitigation: function () {
        var totMit=0;
        var mits=this.mitigations();
        for (var i=0; i<4; i++) {
            totMit+=mits[i];
        }
        if (totMit>95)
            totMit=95;
        return totMit;
    },
    getHash: function() {
        return this.pluck("shortType").join(",");
    }});
