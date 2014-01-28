var PaperBag = function (el, paper) {

    var me = this;
    console.log(el);
    this.$el = $(el);
    this.scale = 1;
    this.tmpScale = 1;
    this.offsetX = el.offsetLeft;
    this.offsetY = el.offsetTop;
    this.tmpPageX=0;
    this.tmpPageY=0;
    this.dragX = 0; //positive will "move the stuff to the left"
    this.tmpX = 0;
    this.dragY = 0; //positive will "move the stuff upwards"
    this.tmpY = 0;
    this.changed = false;
    //this.outerWidth = this.$el.width();
    //this.outerHeight = this.$el.height();
    this.origWidth = paper.width;
    this.origHeight = paper.height;
    this.innerWidth = this.origWidth;
    this.innerHeight = this.origHeight;
    this.rotation = 0;

    this.debug = function () {
        var str="";
        if ((me.tmpPageX !== 0 ) || (me.tmpPageY !== 0)) {
            str = "PageX: " + me.tmpPageX + ", PageY: " + me.tmpPageY + "<br>";
            var x = me.tmpPageX - me.offsetX;
            var y = me.tmpPageY - me.offsetY;
            str += "on plane: " + x + "|" + y;
        } else {
            str = "No tmpPageXY";
        }
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
        me.debug();
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
        console.log(e);
        me.tmpScale = e.gesture.scale;
        me.tmpPageX = e.gesture.center.pageX;
        me.tmpPageY = e.gesture.center.pageY;
        me.changed = true;
        me.update();
    };

    this.handleRelease = function () {
        console.log("Released");
        me.done();
    }

    this.done = function () {
        if (me.changed) {
            me.saveTmp();
        }
        me.resetTmp();
    };

    this.saveTmp = function () {
        console.log("Save ");
        me.scale *= me.tmpScale;
        me.dragX += me.tmpX;
        me.dragY += me.tmpY;
    };

    this.resetTmp = function () {
        //reset tmp
        me.tmpScale = 1;
        me.tmpX = 0;
        me.tmpY = 0;
        me.tmpPageX = 0;
        me.tmpPageY = 0;
        me.changed = false;
    };

    this.handleScroll = function (e) {
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
            me.tmpScale = 1.1;
        } else {
            //zoom in
            me.tmpScale = .9;
        }

        me.tmpPageX = e.pageX;
        me.tmpPageY = e.pageY;
        me.changed = true;
        me.update();
        me.done();
        e.preventDefault();
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
        me.$el.on("mousewheel DOMMouseScroll", this.handleScroll);
        return true;
    };

    this.init();
};


