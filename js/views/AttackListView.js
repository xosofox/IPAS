var AttackListView = Backbone.View.extend({
	initialize: function () {
		_.bindAll(this, "addOne");
		this.listenTo(this.collection, "add", this.addOne);
	},
	addOne: function (at) {
		var av = new AttackInfoView({
			model: at
		});
		this.$el.append(av.render().el);
	},
	render: function () {
	}
});