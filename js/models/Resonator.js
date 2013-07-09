var Resonator = Backbone.Model.extend({
    defaults: {
        "distanceToPortal": 35,
        energyTotal: 1000,
        level: 1
    },
    getMaxEnergy: function () {
        return reso_capacity[this.get("level")];
    },
    getPercentage: function () {
        return Math.round(1000 * this.get("energyTotal") / this.getMaxEnergy()) / 10;
    },
    isDead: function () {
        return (this.get("energyTotal") == 0);
    },
    isFull: function () {
        return (this.get("energyTotal") == this.getMaxEnergy());
    },
    needsEnergy: function () {
        return (!(this.isDead() || this.isFull()));
    },
    charge: function (charge) {
        var e = this.get("energyTotal");
        var max = this.getMaxEnergy();
        var unused = 0;
        if (e + charge > max) {
            unused = charge + e - max;
            e = max;
        } else {
            e += charge;
            unused = 0;
        }
        this.set("energyTotal", e);
        return unused;
    }
});

