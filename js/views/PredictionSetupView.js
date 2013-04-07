var PredictionSetupView = Backbone.View.extend({
    model: Prediction,
    initialize: function () {
        //this.listenTo(this.model, "change", this.render)
        var html = "";
        html += '<input type="checkbox" id="predictioncheck"><label for="predictioncheck">Predict damage</label>';
        html += '<br />';
        this.$el.html(html);
        _.bindAll(this, "switchprediction", "predictDamage");
        var me = this;
        border.mouseover(function () {
            if (me.model.get("state")) {
                me.interval = setInterval(me.predictDamage, 200);
            }
        });
        border.mouseout(function () {
            if (me.interval) {
                clearInterval(me.interval);
            }
        });

    },
    events: {
        "change #predictioncheck": "switchprediction",
    },
    switchprediction: function (e) {
        var predict = $(e.currentTarget).is(":checked");
        this.model.set("state", predict);
    },
    predictDamage: function () {
        var x = position.get("x");
        var y = position.get("y");
        this.predictedAttack = new Attack({x: x, y: y, level: attackSetup.get("level"), simulate: true});
    }
});
