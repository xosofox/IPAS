var AttackListView = Backbone.View.extend({
	initialize: function () {
		_.bindAll(this, "addOne","summary");
		this.listenTo(this.collection, "add", this.addOne);
	},
	addOne: function (at) {
		var av = new AttackInfoView({
			model: at
		});
		this.$el.append(av.render().el);
        this.summary();
        this.render();
	},
    summary: function() {
        burstercount=[];
        for (var i=1;i<=8;i++) {
            burstercount[i]=0;
        }
        _.each(this.collection.pluck("level"),function(e){burstercount[e]++});
        //console.log(burstercount);
    },
	render: function () {
        //console.log("Jetzt ein Update");
	}
});