var ResonatorDetailList = Backbone.View.extend({
    initialize: function () {
        this.render();
        this.listenTo(portal,"change:rechargeXMused change:totalRechargeXMused",this.showRechargeXM)
    },
    collection: ResonatorCollection,
    events: {
        "click #recharge": "portalrecharge"
    },
    portalrecharge: function () {
        portal.recharge();
    },
    showRechargeXM: function() {
        $('#rechargeXMused').text(portal.get("rechargeXMused"));
        $('#totalRechargeXMused').text(portal.get("totalRechargeXMused"));
    },
    render: function () {
        var tr;
        var me = this;
        //render in same order as IITC
        _.each([2, 1, 3, 0, 4, 7, 5, 6], function (i, counter) {
            var reso = me.collection.at(i);
            if ((counter % 2) == 0) {
                tr = $('<tr></tr>');
                me.$el.append(tr);
            }
            var rdv = new ResonatorDetailView({
                model: reso,
                position: directions[i]
            });
            rdv.render();
            tr.append(rdv.el);
        });
        this.$el.append('<tr><td colspan="2"><input type="button" value="Recharge" id="recharge">XM (last/total): <span id="rechargeXMused">0</span>/<span id="totalRechargeXMused">0</span></td></tr>');
    }
});
