var PortalInfoView = Backbone.View.extend({
	model: Portal,
	initialize: function () {
		this.listenTo(this.model, "change", this.render)
		this.render();
	},
	render: function () {
		var level=this.model.get("level");
		this.$el.html('<h1 style="color: ' + level_color[level-1] + '">'+level+'</h3>');
	}
});