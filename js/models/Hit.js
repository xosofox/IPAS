var Hit = Backbone.Model.extend({
    defaults: {
        level: 0,
        critical_hit: false,
        distance: 40,
        target_destroyed: false,
        damage: 0,
        energy: 3000,
        portal_mitigation: []
    },
    getTotalMitigation: function () {
        var t = 0;
        var pm = this.get("portal_mitigation");
        for (var i = 0; i < 4; i++) {
            m = pm[i];
            if (m === null) {
                m = 0;
            }
            t += m;
        }
        return t;
    }
})

var HitCollection = Backbone.Collection.extend({
    model: Hit
});
