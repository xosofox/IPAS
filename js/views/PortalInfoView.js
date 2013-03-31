var PortalInfoView = Backbone.View.extend({
	model: Portal,
	initialize: function () {
		this.listenTo(this.model, "change", this.render)
		var html = '';
		html += '<span id="portallevel" style="font-size: 14pt; color: #fff">0</span><br />';
		html += 'Preconfigure Resos: <select id="preset" class="presetSelect" name="preset">';
		_.each(PRESETS, function (p, i) {
			html += '<option value="' + i + '">' + p.title + '</option>';
		});
		html += '</select><br />';
		html += '<label for="decay">Decayed (<span id="decayDays">0</span> days)</label><br />';
		html += '<input type="range" step="1" min="0" max="7" id="decay" class="decaySelector" value="0" /><br />';
		html += '<label for="equidistant">All resos same distance: <input type="checkbox" id="equidistant">';

		this.$el.html(html);
		this.portallevel = $('#portallevel', this.$el);
		this.render();
	},
	events: {
		"change .presetSelect": "preconfigure",
		"change .decaySelector": "decay"
	},
	preconfigure: function (e) {
		var id = $(e.currentTarget).val();
		this.model.applyPreset(id);
	},
	decay: function (e) {
		days = $(e.currentTarget).val();
		$('#decayDays').text(days);
		this.model.set("decayDays", days).decay();
	},
	render: function () {
		var level = this.model.get("level");
		this.portallevel.text(level).css("color", level_color[level - 1]);
	}
});
