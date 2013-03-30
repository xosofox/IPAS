var Portal = Backbone.Model.extend({
	resonators: {},
	level: {},
	initialize: function() {
		_.bindAll(this,"reposition","applyPreset");
		this.set("resonators",new ResonatorCollection()),
		this.resonators=this.get("resonators")
		this.listenTo(this.resonators,"add change",this.reposition);
	},
	reposition: function(changedReso) {
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
	},
	decay: function () {
		       var days = this.get("decayDays");
		       var perc = DECAY_RATE * days;
			     this.resonators.each(function(e,i) {
				     e.set("energyTotal",e.getMaxEnergy()*(1-perc));
			     });
	       },
	applyPreset: function (presetId) {
		if (presetId in PRESETS) {
			     var preset = PRESETS[presetId];
			     var resoSettings = preset.resonators;
			     this.resonators.each(function(e,i) {
				     e.set(resoSettings[i]);
			     });
			     this.decay()
		} else {
			alert("Could not find preset " + presetId);
	     }
		     }
});
