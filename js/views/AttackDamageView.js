var AttackDamageView = Backbone.View.extend({
    model: Attack,
    initialize: function () {
        _.bindAll(this,"render");
        paper.setStart();
        this.dmgViews=[];
        for (var i=0; i<8;i++) {
            var dv =  paper.text(40,20*i,"0%");
            dv.attr("font-size", "16pt");
            dv.attr("fill", "#e00");
            this.dmgViews[i] = dv;
        }
        this.dmgViewElements=paper.setFinish();
        this.dmgViewElements.attr("opacity",0);
    },
    setModel: function(m) {
        this.model = m;
    },
	render: function () {
        var me = this;
        _.each(resonatorViews,function(resoView,i) {
            var xy = xyForResoDistance(resoView.model.get("distanceToPortal")+8,directions[i]);
            var perc =Math.round(me.model.attributes.damagePerResonator[i].percent*1000)/10;
            me.dmgViews[i].attr("x",xy.x).attr("y",xy.y).attr("text",perc + "%");
        })
        this.dmgViewElements.stop().attr("opacity",1);
        var fade= Raphael.animation({opacity:0},400);
        this.dmgViewElements.animate(fade.delay(3000));
	}
});