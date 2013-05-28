var AttackCollection = Backbone.Collection.extend({
    model: Attack,
    bursterCost: function() {
	var xm=0;
        this.each(function(a,i) {
	    var l=a.get("level");
	    xm+=burster_cost[l-1];
	});
	return xm;
    }
});
