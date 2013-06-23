var LinkCollection = Backbone.Collection.extend({
	model: Link,
    initialize: function() {
        _.bindAll(this,"linkMitigation");

    },
    linkMitigation: function () {
        return Math.round(4.0/9*Math.atan(this.size() / Math.E)*100);
    },
    getHash: function() {
        return this.pluck("distance").join(",");
    },
    getIncoming: function() {
        var incoming =this.filter(function (l) { return (l.get("distance")<0);});
        return incoming;
    },
    countIncoming: function() {
        return this.getIncoming().length;
    },
    getOutgoing: function() {
        return this.filter(function (l) { return l.get("distance")>0});
    },
    countOutgoing: function() {
        return this.getOutgoing().length;
    }
});
