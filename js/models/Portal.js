var Portal = Backbone.Model.extend({
	resonators: {},
	level: {},
	initialize: function() {
		_.bindAll(this,"recalc");
		this.set("resonators",new ResonatorCollection()),
		this.resonators=this.get("resonators")
		this.listenTo(this.resonators,"add change",this.recalc);
	},
	recalc: function(changedReso) {
		if (changedReso.hasChanged("distanceToPortal")) {
			if (EQUIDISTANT) {
				this.resonators.invoke("set",{"distanceToPortal":changedReso.get("distanceToPortal")});
			}
		}

		var level=0;
		_.each(this.resonators.pluck("level"),function(l) {
			level+=l;
		});
		level=level/8;
		this.set("exactlevel",level);
		this.set("level",level >=1 ? Math.floor(level) : 1);
	}
});
