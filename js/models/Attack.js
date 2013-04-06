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
        _.bindAll(this,"calculate", "attack");
        //this.attack();
    },
	attack: function() {
		this.calculate(true);
	},
	
    calculate: function(withDamage) {
		var me = this;
        var dpr = this.get("damagePerResonator");
		_.each(resonatorViews, function (resoView, i) {
			var level = me.get("level");
            var formula = attackSetup.get("formula");
			var energy = resoView.model.get("energyTotal");
			var distancePix = Math.sqrt(Math.pow(me.get("x") - resoView.raphaElement.attr("cx"), 2) + Math.pow(me.get("y") - resoView.raphaElement.attr("cy"), 2));
			var distanceM = pixInM(distancePix);
			var maxRange = burster_range[level - 1];
			var maxDamage = burster_damage[level - 1];

            var damage = DAMAGE_FUNCTIONS[formula].func(distanceM, maxRange, maxDamage, level);

			energy = resoView.model.get("energyTotal");
			if (energy > 0) {
				if (energy > damage) {
					energy -= damage;
				} else {
					damage = energy;
					energy = 0
				}
				if (withDamage) {
					resoView.model.set("energyTotal", energy);
				}
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
		if (withDamage) {
			attackDamageView.setModel(this);
			attackDamageView.render();
			damageHeatMapView.render();
		}
	}
});
