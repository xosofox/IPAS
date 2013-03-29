var PortalInfoView = Backbone.View.extend({
	model: Portal,
	initialize: function () {
		this.listenTo(this.model, "change", this.render)
		this.render();
	},
	render: function () {
		this.$el.html("Level: "+ this.model.get("level"));
	}
});