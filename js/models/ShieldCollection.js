var ShieldCollection = Backbone.Collection.extend({
	model: Shield,
    initialize: function() {
        for (var i=0;i<4;i++) {
            this.add({});
        }
    },
    getHash: function() {
        return this.pluck("short").join(",");
    }});
