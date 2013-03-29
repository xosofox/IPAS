var Resonator = Backbone.Model.extend({
	defaults: {
		"distanceToPortal": MAX_RESO_RANGE,
		energyTotal: 1000,
		level: 1
	},
	getMaxEnergy: function () {
		return reso_capacity[this.get("level") - 1];
	},
	getPercentage: function () {
		return Math.round(1000 * this.get("energyTotal") / this.getMaxEnergy()) / 10;
	}
});

