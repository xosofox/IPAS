var DamageHeatMapView = Backbone.View.extend({
    model: AttackSetup,
    collection: AttackCollection,

    initialize: function () {
        _.bindAll(this, "render", "createDataset");
        this.listenTo(this.model, 'change', this.check);
        this.listenTo(attacks, 'add remove', this.check);
    },
    check: function (a) {
        if (this.model.get("heatmap")) {
            setTimeout(this.render, 0);
        } else {
            this.$el.hide();
        }
    },
    createDataset: function () {
        var level = this.model.get("level");
        for (var i = 0; i <= height; i += 9) {
            for (var j = (i % 18 == 0) ? 0 : 5; j <= width; j += 10) {
                var attack = new Attack({x: j, y: i, level: level, simulate: true, show: false});
                attack.calculate();
                this.collection.add(attack);
            }
        }

        // let's get some data
        var data = [];
        var max = 0;
        var min = 100000;
        this.collection.each(function (at, i) {
            var level = at.get("level");
            var damageTotal = at.get("damageTotal");
            var x = at.get("x");
            var y = at.get("y");

            max = Math.max(max, damageTotal);
            min = Math.min(min, damageTotal);
            data.push({x: x, y: y, count: damageTotal});
        });

        this.collection.each(function (at, i) {
            data[i].count -= min;
        });

        var dataSet = {
            max: max - min,
            data: data
        };

        return dataSet;
    },
    render: function () {
        this.$el.html("").show();
        this.collection.reset();

        // heatmap configuration
        var config = {
            element: this.el,
            radius: 6,
            gradient: { 0.35: "rgb(0,0,255)", 0.5: "rgb(0,255,0)", 0.6: "yellow", 0.7: "rgb(255,100,0)", 0.75: "rgb(255,0,0)", 1.0: "rgb(255,0,0)" },
            opacity: 50
        };

        //creates and initializes the heatmap
        var heatmap = h337.create(config);
        var data = this.createDataset();
        heatmap.store.setDataSet(data);
    }
});
