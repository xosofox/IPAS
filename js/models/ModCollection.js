var ModCollection = Backbone.Collection.extend({
    model: Mod,
    initialize: function () {
        _.bindAll(this, "mitigations", "modMitigation");
        //add 4 slots
        for (var i = 0; i < 4; i++) {
            this.add({});
        }
    },
    mitigations: function () {
        return this.pluck("mitigation");
    },
    modMitigation: function () {
        var modMit = 0;
        var mits = this.mitigations();
        for (var i = 0; i < 4; i++) {
            modMit += mits[i];
        }
        return modMit;
    },
    getHash: function () {
        return this.pluck("modCode").join(",");
    }});
