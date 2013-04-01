var Attack = Backbone.Model.extend({
	defaults: {
		x: 0,
		y: 0,
		level: 1,
		damageTotal: 0,
		energyPortal: 0,
		energyPortalMax: 0
	},
	initialize: function () {
		var me = this;
		_.each(resonatorViews, function (resoView, i) {
			var level = me.get("level");
			var energy = resoView.model.get("energyTotal");
			var distancePix = Math.sqrt(Math.pow(me.get("x") - resoView.raphaElement.attr("cx"), 2) + Math.pow(me.get("y") - resoView.raphaElement.attr("cy"), 2));
			var distanceM = pixInM(distancePix);
			var maxRange = burster_range[level - 1];
			var maxDamage = burster_damage[level - 1];
			// Damage = MaxDamage * [ 1 - (distance / MaxRange)2 ]
			var damage = maxDamage * ( 1 - Math.pow(distanceM / maxRange, 2) );
			damage = damage < 0 ? 0 : damage;
			// or
			// linear
			// var damage = maxDamage * distanceM / maxRange;
			energy = resoView.model.get("energyTotal");
			if (energy > 0) {
				energy -= damage;
				energy = energy > 0 ? energy : 0;
				resoView.model.set("energyTotal", energy);
			} else {
				//no reso, no damage!
				damage = 0;
			}

			me.attributes.damageTotal += damage;
			me.attributes.energyPortal += energy;
			me.attributes.energyPortalMax += reso_capacity[resoView.model.get("level")];
		});
	}
});
