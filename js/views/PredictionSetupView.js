var PredictionSetupView = Backbone.View.extend({
    model: Prediction,
    initialize: function () {
        //this.listenTo(this.model, "change", this.render)
        var html = "";
        html += '<input type="checkbox" id="predictioncheck"><label for="predictioncheck">Predict damage</label>';
        html += '<br />';
        this.$el.html(html);
        _.bindAll(this, "switchprediction", "predictDamage", "predictionPosition");
        var me = this;
        border.mousemove(this.predictionPosition);
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
    predictionPosition: function (e, x, y) {
        if (typeof e.offsetX === "undefined" || typeof e.offsetY === "undefined") {
            var targetOffset = $(e.currentTarget).offset();
            e.offsetX = e.pageX - targetOffset.left;
            e.offsetY = e.pageY - targetOffset.top;
        }
        var x = e.offsetX;
        var y = e.offsetY
        this.model.set({x: x, y: y});
    },
    predictDamage: function () {
        var x = this.model.get("x");
        var y = this.model.get("y");
        this.predictedAttack = new Attack({x: x, y: y, level: attackSetup.get("level"), simulate: true});
    }
});
