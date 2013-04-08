var DamageHeatMapView = Backbone.View.extend({
	model: AttackSetup,	
	collection: AttackCollection,	
    heatmap: Object,

    initialize: function () {
        _.bindAll(this, "render");

		this.$el.html('<span style="position:absolute; top: -20px; cursor: pointer" class="calculate">Calculate Heatmap</span>');

		//creates and initializes the heatmap
		var config = {
			element: this.$el[0],
			radius: 6,
			gradient: { 0.35: "rgb(0,0,255)", 0.5: "rgb(0,255,0)", 0.6: "yellow", 0.7: "rgb(255,100,0)", 0.75: "rgb(255,0,0)", 1.0: "rgb(255,0,0)" },
			opacity: 50
			
		};
		
		this.heatmap = h337.create(config);
    },
    events: {
        "click .calculate": "render"
    },
	
    render: function() {
		this.collection.reset();
		
		for (var i = 0; i <= height; i += 9) {
			for (var j = (i % 18 == 0) ? 0: 5; j <= width; j += 10) {
				var attack = new Attack({x: j, y: i, level: this.model.get("level")});
				attack.calculate();
				this.collection.add(attack);
			}
		}

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
			min = Math.min(min, damageTotal);
            data.push({x: x, y: y, count: damageTotal}); 
        });

        this.collection.each(function(at,i) {
            data[i].count -= min;
        });
		
		var dataSet = {
			max: max-min,
			data: data
		};
	 
		this.heatmap.store.setDataSet(dataSet);
	
    }
});
