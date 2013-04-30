var ShieldCollection = Backbone.Collection.extend({
	model: Shield,
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
        return totMit;
    },
    getHash: function() {
        return this.pluck("shortType").join(",");
    }});
