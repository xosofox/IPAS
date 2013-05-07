var AttackSummaryView = Backbone.View.extend({
    initialize: function () {
        _.bindAll(this, "render");
        this.listenTo(this.collection, "add change remove reset", this.render);
        this.render();
    },
    events: {
        "click .reset": "reset",
        "click .undo": "undo"
    },
    render: function () {
        var burstercount = [];
        for (var i = 0; i < 8; i++) {
            burstercount[i] = 0;
        }
        _.each(this.collection.pluck("level"), function (e) {
            burstercount[e - 1]++
        });
        var htmls = [];
        for (var i = 0; i < 8; i++) {
            var b = burstercount[i];
            if (b > 0) {
                htmls.push(b + 'x <span style="color:' + level_color[i + 1] + '">L' + (i + 1) + '</span>');
            }
        }
        var resetSpan = ' <span style="cursor: pointer" class="reset">Reset</span>';
        var undoSpan = ' <span style="cursor: pointer" class="undo">Undo</span>';
        this.$el.html(htmls.join(", ") + resetSpan + " - " + undoSpan);
    },
    reset: function () {
        this.collection.reset();
        portal.reset();
    },
    undo: function () {
        if(this.collection.length > 0)
            this.collection.pop();
    }
});