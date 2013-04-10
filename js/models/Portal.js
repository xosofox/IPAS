var Portal = Backbone.Model.extend({
    resonators: {},
    shields: {},
    level: {},
    defaults: {
        decayDays: 0,
        level: 1,
        rechargeXMused: -1
    },
    initialize: function () {
        _.bindAll(this, "reposition", "applyPreset", "saveConfig", "reset", "recharge", "fill");
        this.set("resonators", new ResonatorCollection());
        this.set("shields", new ShieldCollection());
        this.resonators = this.get("resonators");
        //init 8 resos
        this.listenTo(this.resonators, "add change", this.reposition);
        this.saveConfig();
    },
    reposition: function () {
        var level = 0;
        _.each(this.resonators.pluck("level"), function (l) {
            level += l;
        });
        level = level / 8;
        this.set("exactlevel", level);
        this.set("level", level >= 1 ? Math.floor(level) : 1);
    },
    decay: function () {
        this.reset();
        var days = this.get("decayDays");
        var perc = DECAY_RATE * days;
        this.resonators.each(function (e) {
            e.set("energyTotal", e.get("energyTotal") - e.getMaxEnergy() * perc);
        });
    },
    applyPreset: function (presetId) {
        if (presetId in PRESETS) {
            var preset = PRESETS[presetId];
            var resoSettings = preset.resonators;
            this.resonators.each(function (e, i) {
                e.set(resoSettings[i]);
            });
        } else {
            alert("Could not find preset " + presetId);
        }
    },
    loadFromConfigHash: function (confighash) {
        var parts = confighash.split("|");
        var resohash = parts[0];
        var shieldhash = parts[1];
        var resoVals = resohash.split(";");
        _.each(resoVals, function (resoval, i) {
            var values = resoval.split(",");
            resonators.at(i).set({
                level: parseInt(values[0], 10),
                distanceToPortal: parseInt(values[1], 10),
                energyTotal: parseInt(values[2], 10)
            });
        });
        this.saveConfig();
    },
    getConfigHash: function () {
        var hashparts = [];
        this.resonators.each(function (reso) {
            hashparts.push(reso.get("level") + "," + reso.get("distanceToPortal") + "," + reso.get("energyTotal"));
        });
        return hashparts.join(";") + "|" + this.get("shields").getHash();
    },
    saveConfig: function () {
        this.set("config", this.getConfigHash());
    },
    countResos: function () {
        return _.reduce(this.resonators.pluck("energyTotal"), function (c, e) {
            if (e > 0) {
                c++
            }
            return c
        }, 0);
    },
    fill: function () {
        this.resonators.each(function (e) {
            e.set("energyTotal", e.getMaxEnergy());
        });
    },
    commit: function () {
        this.fill();
        this.saveConfig();
        this.decay();
    },
    recharge: function () {
        var resosInNeed =[];
        this.resonators.each(function (reso,i) {
            if (reso.needsEnergy()) {
                resosInNeed.push(i);
            }
        });
        console.log(resosInNeed);
        var unused=0;
        if (resosInNeed.length>0) {
            var charge=Math.round(1000/resosInNeed.length);
            _.each(resosInNeed, function (i) {
                unused+=this.resonators.at(i).charge(charge);
            })
        } else {
            unused=1000;
        }
        this.set("rechargeXMused",1000-unused);
    },
    reset: function () {
        this.loadFromConfigHash(this.get("config"));
    }
});
