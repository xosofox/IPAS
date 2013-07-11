var Portal = Backbone.Model.extend({
    resonators: {},
    mods: {},
    links: {},
    level: {},
    defaults: {
        decayDays: 0,
        level: 1,
        exactlevel: 1,
        rechargeXMused: -1,
        totalRechargeXMused: 0
    },
    initialize: function () {
        _.bindAll(this, "reposition", "applyPreset", "saveConfig", "reset", "recharge", "fill", "applyMitigation", "portalRange");
        this.set("resonators", new ResonatorCollection());
        this.set("mods", new ModCollection());
        this.set("links", new LinkCollection());
        this.resonators = this.get("resonators");
        this.mods = this.get("mods");
        this.links = this.get("links");
        this.listenTo(this.resonators, "add change", this.reposition);
        this.saveConfig();
    },
    reposition: function () {
        var level = 0;
        var resos = this.resonators.filter(function (r) {
            return r.get("energyTotal") > 0;
        });
        _.each(resos, function (r) {
            level += r.get("level");
        });
        level = level / 8;
        this.set("exactlevel", level);
        this.set("level", level >= 1 ? Math.floor(level) : 1);
        this.links.checkLinkSupport();
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
        this.commit();
    },
    loadFromConfigHash: function (confighash) {
        var parts;
        if (confighash.indexOf("|") >= 0) {
            alert("Looks like you are using an old version of the IITC IPAS plugin - please make sure to update your user scripts to use the full functionality, including link mitigation and new mods");
            parts = confighash.split("|");
            parts[2] = "";
        } else {
            parts = confighash.split("/");
        }

        var resohash = parts[0];
        var modhash = parts[1];
        var linkhash = parts[2];

        var oldModTypes = {
            "c": "sc10",
            "r": "sr20",
            "v": "sv30",
            "cs10": "sc10",
            "rs20": "sr20",
            "vrs30": "sv30"
        };

        var resoVals = resohash.split(";");
        _.each(resoVals, function (resoval, i) {
            var values = resoval.split(",");
            resonators.at(i).set({
                level: parseInt(values[0], 10),
                distanceToPortal: parseInt(values[1], 10),
                energyTotal: parseInt(values[2], 10)
            });
        });
        var modVals = modhash.split(",");
        _.each(modVals, function (modCode, i) {
            //convert 0 to -
            modCode = (modCode === "0") ? "-" : modCode;
            //to avoid BC break, convert c,r,v to new shields
            if (modCode in oldModTypes) {
                modCode = oldModTypes[modCode];
            }
            this.mods.at(i).setModCode(modCode);
        }, this);

        if (linkhash) {
            var linkVals = linkhash.split(",");
            this.links.reset();
            _.each(linkVals, function (distance, i) {
                this.links.add(new Link(distance));
            }, this);
        }
        this.saveConfig();
    },
    getConfigHash: function () {
        var hashparts = [];
        this.resonators.each(function (reso) {
            hashparts.push(reso.get("level") + "," + reso.get("distanceToPortal") + "," + reso.get("energyTotal"));
        });
        return hashparts.join(";") + "/" + this.get("mods").getHash() + "/" + this.get("links").getHash();
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
            if (e.get("energyTotal") > 0) {
                e.set("energyTotal", e.getMaxEnergy());
            }
        });
    },
    commit: function () {
        this.fill();
        this.saveConfig();
        this.decay();
    },
    recharge: function () {
        var resosInNeed = [];
        this.resonators.each(function (reso, i) {
            if (reso.needsEnergy()) {
                resosInNeed.push(i);
            }
        });
        var unused = 0;
        if (resosInNeed.length > 0) {
            var charge = Math.round(1000 / resosInNeed.length);
            _.each(resosInNeed, function (i) {
                unused += this.resonators.at(i).charge(charge);
            })
        } else {
            unused = 1000;
        }
        var used = 1000 - unused;
        this.set("rechargeXMused", used);
        var t = this.get("totalRechargeXMused");
        t += used;
        var t = this.set("totalRechargeXMused", t);
    },
    deployCost: function () {
        var xm = 0;
        this.resonators.each(function (reso, i) {
            var l = reso.get("level");
            if (l >= 1) {
                xm += reso_deploy_cost[l - 1];
            }
        });

        this.mods.each(function (mod, i) {
            xm += mod.getDeployCost();
        });
        return xm;
    },
    totalMitigation: function () {
        var totMit = 0;
        var modMit = this.mods.modMitigation();
        var linkMit = this.links.linkMitigation();

        totMit = modMit + linkMit;
        if (totMit > 95) totMit = 95;
        return totMit;
    },
    applyMitigation: function (damage) {
        //reduce damage due to mods and links
        return damage * (100 - this.totalMitigation()) / 100;
    },
    getPortalEnergy: function () {
        var energy = 0;
        this.resos.each(function (reso) {
            var e = reso.get("energyTotal");
            energy += e;
        });
        return energy;

    },
    getPortalEnergyMax: function () {
        var energy = 0;
        this.resos.each(function (reso) {
            var e = reso_capacity[reso.get("level")]
            energy += e;
        });
        return energy;
    },
    portalRange: function () {
        //Portal Range  = 160m x (average resonator level) ^ 4 - says decodeingress...
        var range = 160 * Math.pow(this.get("exactlevel"), 4);
        return range;
    },
    portalRangeText: function () {
        var range = Math.round(this.portalRange());
        if (range > 1000) {
            return Math.round(range/100)/10 + " km";
        } else {
            return Math.round(this.portalRange()) + " m";
        }

    },
    reset: function () {
        this.set({"rechargeXMused": 0, "totalRechargeXMused": 0});
        this.loadFromConfigHash(this.get("config"));
    }
});
