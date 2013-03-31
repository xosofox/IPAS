var ResonatorDetailList = Backbone.View.extend({
	initialize: function () {
		this.render();
	},
	collection: ResonatorCollection,
	events: {

	},
	render: function () {
		var tr;
		var me = this;
		this.collection.each(function (reso, i) {
			if ((i % 2) == 0) {
				tr = $('<tr></tr>');
				me.$el.append(tr);
			}
			var rdv = new ResonatorDetailView({
				model: reso,
				position: directions[i]
			});
			rdv.render();
			tr.append(rdv.el);
		})
	}
});