var ResonatorView = Backbone.View.extend({
    model: Resonator,
    initialize: function (args) {
        this.raphaElement = paper.circle(portalX, portalY, RESO_RADIUS);
        this.raphaElement.drag(
            function (dx, dy, x, y, e) {
                var el = this.raphaElement;
                //during drag, just update to latest target position
                //calculation happens in interval
                el.cx = el.ox + dx;
                el.cy = el.oy + dy;
                //el.attr({cx:el.ox+dx, cy:el.oy+dy});
                //this.model.set("distanceToPortal", Math.round(distanceToPortalForXY(el.ox + dx, el.oy + dy)));
            },
            function () {
                var el = this.raphaElement;
                //save original pos when starting
                el.ox = el.attr("cx");
                el.oy = el.attr("cy");
                var me = this;
                //set up regular check for dragresult, not doing the calculation on every pixel
                this.dragInterval = setInterval(function () {
                    if (typeof el.cx !== "undefined") {
                        var d = Math.round(distanceToPortalForXY(el.cx, el.cy));
                        d = d > MAX_RESO_RANGE ? MAX_RESO_RANGE : d;
                        if (EQUIDISTANT) {
                            resonators.invoke("set", {"distanceToPortal": d });
                        } else {
                            me.model.set("distanceToPortal", d);
                        }
                    }
                }, 100);
            },
            function (e) {
                //remove the drag check interval
                clearInterval(this.dragInterval);
            },
            this, this, this //contexts for drag functions
        );
        this.setElement(this.raphaElement.node);
        this.delegateEvents(this.events);
        this.listenTo(this.model, "change", this.render);
    },

    events: {
    },

    render: function () {
        if (this.model.get("energyTotal") <= 0) {
            this.raphaElement.hide();
        } else {
            this.raphaElement.show();
            var xy = xyForResoDistance(this.model.get("distanceToPortal"), this.options.position)
            var level = this.model.get("level");
            this.raphaElement.animate({"cx": xy.x, "cy": xy.y, "fill": level_color[level - 1] }).toFront();
        }
        return this;
    }
});
