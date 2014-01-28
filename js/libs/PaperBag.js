var PaperBag = function (el, paper) {

    var me = this;
    console.log(el);
    this.$el = $(el);
    this.scale = 1;
    this.tmpScale = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragX = 0; //positive will "move the stuff to the left"
    this.tmpX = 0;
    this.dragY = 0; //positive will "move the stuff upwards"
    this.tmpY = 0;
    this.changed =false;
    //this.outerWidth = this.$el.width();
    //this.outerHeight = this.$el.height();
    this.origWidth = paper.width;
    this.origHeight = paper.height;
    this.innerWidth = this.origWidth;
    this.innerHeight = this.origHeight;
    this.rotation = 0;

    this.debug = function() {
        var str ="";
        $('#debug').text(str);
    };

    this.adjustToScale = function (pixels) {
        return pixels * me.scale * me.tmpScale;
    };

    this.screenToPlaneX = function (screenX) {
        return screenX;
    };

    this.screenToPlaneY = function (screenY) {
        return screenY;
    };

    this.update = function () {
        //console.log("Updating to ", this.dragX, this.dragY, this.innerWidth, this.innerHeight);
        var x = this.dragX + this.tmpX;
        var y = this.dragY + this.tmpY;
        var scale = this.scale * this.tmpScale;
        me.innerWidth = me.origWidth * scale;
        me.innerHeight = me.origHeight * scale;
        paper.setViewBox(-x, -y, me.innerWidth, me.innerHeight);
    };

    this.handleDrag = function (e) {
        me.tmpX = me.adjustToScale(e.gesture.deltaX);
        me.tmpY = me.adjustToScale(e.gesture.deltaY);
        me.changed = true;
        me.update();
    };

    this.handlePinch = function (e) {
        //console.log(e);
        me.tmpScale = e.gesture.scale;
        me.changed = true;
        me.update();
    };

    this.handleRelease = function () {
        console.log("Released");
        if (me.changed) {
            me.saveTmp();
        }
        me.resetTmp();
    };

    this.saveTmp = function() {
        console.log("Save ");
        me.scale *= me.tmpScale;
        me.dragX += me.tmpX;
        me.dragY += me.tmpY;
    };

    this.resetTmp = function() {
        //reset tmp
        me.tmpScale=1;
        me.tmpX=0;
        me.tmpY = 0;
        me.changed = false;
    };

    this.handleScroll = function(e) {
        //console.log(e);
        e.delta = null;
        if (e.originalEvent) {
            if (e.originalEvent.wheelDelta) e.delta = e.originalEvent.wheelDelta / -40;
            if (e.originalEvent.deltaY) e.delta = e.originalEvent.deltaY;
            if (e.originalEvent.detail) e.delta = e.originalEvent.detail;
        }
        //console.log(e.delta);
        if (e.delta > 0) {
            //zoom out
            me.zoom(1.1,100,100);
        } else {
            //zoom in
            me.zoom(0.9,100,100);
        }
        e.preventDefault();
    };

    this.zoom = function(scale, x, y) {
        console.log(scale, x, y);
        me.tmpScale=scale;
        me.saveTmp();
        me.update();
        me.resetTmp();
    };

    this.init = function () {
        if (typeof Hammer === "undefined") {
            console.error("If I had a hammer, I'd hammer in the morning");
            return false;
        }

        me.hammertime = Hammer(el, {
            transform_always_block: true,
            prevent_default: true
        })
            .on("drag", me.handleDrag)
            .on("pinch", me.handlePinch)
            .on("release", me.handleRelease)
        ;

        //now bind scroll for zoom on desktop
        me.$el.on("mousewheel DOMMouseScroll",this.handleScroll);
        return true;
    };

    this.init();
};


