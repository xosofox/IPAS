var Attack = Backbone.Model.extend({
	defaults: {
		x: 0,
		y: 0,
		level: 1,
		damageTotal: 0,
        damagePerResonator: [],
		energyPortal: 0,
		energyPortalMax: 0
	},
	initialize: function () {
        _.bindAll(this,"calculate");
        this.calculate();
    },
    calculate: function() {
		var me = this;
        var dpr = this.get("damagePerResonator");
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
				if (energy > damage) {
					energy -= damage;
				} else {
					damage = energy;
					energy = 0
				}
				resoView.model.set("energyTotal", energy);
			} else {
				//no reso, no damage!
				damage = 0;
			}

            var resoCapa = reso_capacity[resoView.model.get("level")-1];
            dpr[i]={};
            dpr[i].damage = damage;
            dpr[i].percent = damage / resoCapa;

			me.attributes.damageTotal += damage;
			me.attributes.energyPortal += energy;
			me.attributes.energyPortalMax += resoCapa;

		});
        attackDamageView.setModel(this);
        attackDamageView.render();
	}
});
