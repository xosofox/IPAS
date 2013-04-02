var ResonatorDetailView = Backbone.View.extend({
	tagName: "td",
	className: "resoInfo",
	model: Resonator,
	position: "N",
	initialize: function (args) {
		this.listenTo(this.model, "change", this.render);
	},
	events: {
	},
	render: function () {
		var level = this.model.get("level");
		var perc = this.model.getPercentage();
		if (perc <= 0) {
			perc = .1;
		}
		this.$el.html(level + '<span style="width: 50px; display: block; border: 1px solid green" title="' + this.model.get("energyTotal") + '/' + this.model.getMaxEnergy() + ' XM"><span style="width: ' + perc + '%; background-color: ' + level_color[level - 1] + '; display: block" >&nbsp;</span></span><span class="distance" style="font-size: 10px">' + this.model.get("distanceToPortal") + " m</span>");
		return this;
	}
});
