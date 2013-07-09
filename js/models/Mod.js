var Mod = Backbone.Model.extend({
    defaults: {
        modCode: "-",
        mitigation: 0,
        modType: "-",
        rarity: "-"
    },
    initialize: function (modCode) {
        if (typeof modCode !== "undefined") {
            modCode = "-";
        }
        this.setModCode(modCode);
    },
    cycle: function () {
        var i = _.indexOf(MODS_AVAILABLE, this.get("modCode"));
        i++;
        i = i % MODS_AVAILABLE.length;
        //dirty hack for now to skip non-shields when cycling
        var newMod = MODS_AVAILABLE[i];
        if (newMod.charAt(0) != "s") newMod = "-";
        this.setModCode(newMod);
    },
    setModCode: function (modCode) {
        this.set("modCode", modCode);
        if (modCode == "-") {
            this.set({
                mitigation: 0,
                modType: "-",
                rarity: "-"
            });
        } else {
            var t = modCode.charAt(0); //type
            var r = modCode.charAt(1); //rarity
            var m = 0;
            //if shield, read mitigation
            if (t == "s") {
                m = parseInt(modCode.substr(2), 10);
            }
            this.set({
                mitigation: m,
                modType: t,
                rarity: r
            });
        }
    },
    getDeployCost: function () {
        return MOD_DEPLOY_COST[this.get("rarity")];
    }

});

