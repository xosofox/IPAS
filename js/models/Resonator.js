var Resonator = Backbone.Model.extend({
	defaults: {
		"distanceToPortal": 35,
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

