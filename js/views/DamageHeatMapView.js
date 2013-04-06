var DamageHeatMapView = Backbone.View.extend({
	model: AttackSetup,	
	collection: AttackCollection,	
    initialize: function () {
        _.bindAll(this, "render");
		this.listenTo(this.model, 'change', this.render);
    },
	
    render: function() {
		this.$el.html("");
		this.collection.reset();
		
		for (var i = 0; i <= height; i += 9) {
			for (var j = (i % 18 == 0) ? 0: 5; j <= width; j += 10) {
				var attack = new Attack({x: j, y: i, level: this.model.get("level")});
				attack.calculate();
				this.collection.add(attack);
			}
		}

		// heatmap configuration
		var el = document.getElementById("damageheatmap");
		var el2 = this.$el;
		var config = {
			element: el,
			radius: 6,
			gradient: { 0.35: "rgb(0,0,255)", 0.5: "rgb(0,255,0)", 0.6: "yellow", 0.7: "rgb(255,100,0)", 0.75: "rgb(255,0,0)", 1.0: "rgb(255,0,0)" },
			opacity: 50
			
		};
		
		//creates and initializes the heatmap
		var heatmap = h337.create(config);
	 
		// let's get some data
		var data = [];
		var max = 0;
		var min = 100000;
        this.collection.each(function(at,i) {
			var level = at.get("level");
			var damageTotal = at.get("damageTotal");
			var x = at.get("x");
			var y = at.get("y");
			
			max = Math.max(max, damageTotal);
			min = Math.max(min, damageTotal);
            data.push({x: x, y: y, count: damageTotal}); 
        });
		
		var dataSet = {
			max: max,
			min: min,
			data: data
		};
	 
		heatmap.store.setDataSet(dataSet);
	
    }
});