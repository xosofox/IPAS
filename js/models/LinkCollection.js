var LinkCollection = Backbone.Collection.extend({
	model: Link,
    initialize: function() {
        _.bindAll(this,"linkMitigation");
    },
    checkLinkSupport: function() {
	var resoCount = portal.countResos();
	var range = portal.portalRange();
	console.log(resoCount,range);
	this.each(function(l) {
		//if number of resos<3 or distance not supported anymore
		if ((resoCount>=3) && (l.get("distance")<range)) {
			l.set("active",true);
		} else {
			l.set("active",false);
		}
	});
	return this;
    },
    linkMitigation: function () {
        return Math.round(4.0/9*Math.atan((this.countIncoming()+this.countOutgoing()) / Math.E)*100);
    },
    getHash: function() {
        return this.pluck("distance").join(",");
    },
    getIncoming: function() {
        var incoming =this.filter(function (l) { return ((l.get("distance")<0) && (l.get("active")));});
        return incoming;
    },
    countIncoming: function() {
        return this.getIncoming().length;
    },
    getOutgoing: function() {
        return this.filter(function (l) { return ((l.get("distance")>0) && (l.get("active")))});
    },
    countOutgoing: function() {
        return this.getOutgoing().length;
    }
});
