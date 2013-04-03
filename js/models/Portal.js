var Portal = Backbone.Model.extend({
    resonators: {},
    shields: [],
    level: {},
    defaults: {
        decayDays: 0,
        level: 1,
        shields: [0, 0, 0, 0]
    },
    initialize: function () {
        _.bindAll(this, "reposition", "applyPreset", "saveConfig", "reset");
        this.set("resonators", new ResonatorCollection());
        this.resonators = this.get("resonators");
        //init 8 resos
        for (i = 0; i < 8; i++) {
            this.resonators.add({});
        }
        this.listenTo(this.resonators, "add change", this.reposition);
        this.saveConfig();
    },
    reposition: function (changedReso) {
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
        this.resonators.each(function (e, i) {
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
            this.decay()
        } else {
            alert("Could not find preset " + presetId);
        }
        this.saveConfig();
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
        this.resonators.each(function (reso, i) {
            hashparts.push(reso.get("level") + "," + reso.get("distanceToPortal") + "," + reso.get("energyTotal"));
        })
        return hashparts.join(";") + "|" + this.get("shields").join(",");
    },
    saveConfig: function () {
        this.set("config", this.getConfigHash());
    },
    reset: function () {
        this.loadFromConfigHash(this.get("config"));
    }
});
