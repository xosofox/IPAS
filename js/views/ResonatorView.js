var ResonatorView = Backbone.View.extend({
	model: Resonator,
	initialize: function (args) {
		this.raphaElement = paper.circle(portalX, portalY, RESO_RADIUS);
		this.raphaElement.drag(
			function (dx, dy, x, y, e) {
				var el = this.raphaElement;
				//el.attr({cx:el.ox+dx, cy:el.oy+dy});
				this.model.set("distanceToPortal", Math.round(distanceToPortalForXY(el.ox + dx, el.oy + dy)));
			},
			function () {
				var el = this.raphaElement;
				el.ox = el.attr("cx");
				el.oy = el.attr("cy");
			},
			function (e) {
				this.render();
				e.preventDefault();
			},
			this, this, this //contexts for drag functions
		);
		this.setElement(this.raphaElement.node);
		this.delegateEvents(this.events);
		this.listenTo(this.model, "change", this.render);
	},

	events: {
	},

	render: function () {
		var xy = xyForResoDistance(this.model.get("distanceToPortal"), this.options.position)
		var level = this.model.get("level");
		this.raphaElement.animate({"cx": xy.x, "cy": xy.y, "fill": level_color[level - 1] }).toFront();
		return this;
	}
});
