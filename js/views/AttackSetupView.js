var AttackSetupView = Backbone.View.extend({
	model: AttackSetup,
	initialize: function () {
		this.listenTo(this.model, "change", this.render)
		var html = "";
		html += 'Select Burster: <select id="bursterlevel" class="bursterSelector" name="burster">';
		for (var i = 1; i <= 8; i++) {
			html += '<option value="' + i + '">Burster Level ' + i + '</option>';
		}
		html += '</select><br />';

		this.$el.html(html);
		this.render();
	},
	events: {
		"change .bursterSelector": "attacklevel"
	},
	attacklevel: function (e) {
		var level = $(e.currentTarget).val();
			    this.model.set("level",level);
			     $('#bursterlevel').val(level);
		crosshair.attr("r", mInPx(burster_range[level - 1]));
	},
	render: function () {
	}
});
