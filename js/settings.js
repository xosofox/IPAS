var MAX_RESO_RANGE = 40;
var RESO_RADIUS = 10;
var PORTAL_RADIUS = 20;
var EQUIDISTANT = true;
var DECAY_RATE = .15;

//var directions = [ "W", "NW", "N", "NE", "SW", "S", "SE", "E"]; //Actually, I have not idea right now how official Ingress counting 0-7 converts to directions
/* from intel map
 Original-Ingress:

 0 4
 1 5
 2 6
 3 7


 compared with IITC
 0: E
 1: NE
 2: N
 3: NW
 4: W
 5: SW
 6: S
 7: SE
 */
var directions = [ "E", "NE", "N", "NW", "W", "SW", "S", "SE"];
var ap_level = [0, 10000, 30000, 70000, 150000, 300000, 600000, 1200000];
var xm_level = [3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
var reso_capacity = [1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000];
var burster_damage = [150, 300, 500, 900, 1200, 1500, 1800, 2700];
var burster_range = [42, 48, 58, 72, 90, 112, 138, 168];
var level_color = ["#fece5a", "#ffa630", "#ff7315", "#e40000", "#fd2992", "#eb26cd", "#c124e0", "#9627f4"];

var DAMAGE_FUNCTIONS = {
    "linear": {
        title: "Linear",
        func: function (distanceM, maxRange, maxDamage, level) {
            var damage = maxDamage * ( 1 - distanceM / maxRange);
            damage = damage < 0 ? 0 : damage;
            return Math.round(damage);
        },
        url: "https://docs.google.com/spreadsheet/ccc?key=0Ar-r_EH0Cv2udF9QRXhUYms0dmdNQmkzT0ZLRElRaFE"
    },
    square: {
        title: "Square",
        func: function (distanceM, maxRange, maxDamage, level) {
            var damage = maxDamage * ( 1 - Math.pow(distanceM / maxRange, 2) );
            damage = damage < 0 ? 0 : damage;
            return Math.round(damage);
        },
        url: "http://www.neckbeard.ca/r/Ingress/comments/14sv1i/optimal_xmp_blast_locations_aim_for_the_middle/c7g8zi0"
    },
    quadratic: {
        title: "Quadratic Falloff",
        func: function (distanceM, maxRange, maxDamage, level) {
            var damage = maxDamage - (maxDamage / Math.sqrt(maxRange) * Math.sqrt(distanceM));
            damage = damage < 0 ? 0 : damage;
            return Math.round(damage);
        },
        url: "https://docs.google.com/spreadsheet/ccc?key=0Ar-r_EH0Cv2udFZaWXEtNnA4MGJqbmU0dDBpdVNxVmc"
    },
    reddit: {
        title: "ChPech's decompile",
        func: function (distanceM, maxRange, maxDamage, level) {
            // L8: (2700)*0.5^(x/(168/5))) as of reddit: http://vi.reddit.com/r/Ingress/comments/17umoi/has_burster_falloff_ever_been_confirmed_to_be/
            var damage = maxDamage * Math.pow(.5, distanceM / (maxRange / 5));
            damage = damage < 0 ? 0 : damage;
            return Math.round(damage);
        },
        url: "http://vi.reddit.com/r/Ingress/comments/17umoi/has_burster_falloff_ever_been_confirmed_to_be/c892d6t"
    },
    ssergni: {
        title: "Ssergni's reliable source",
        func: function(distanceM, maxRange, maxDamage, level) {
            if (distanceM>maxRange) {
                return 0;
            }
            var resoAvgDmg =[
                226,
                376,
                676,
                1070,
                1500,
                2100,
                3000,
                4500
            ];
            var damage = resoAvgDmg[level-1] * Math.pow(.5, distanceM / (maxRange / 5));
            damage = damage < 0 ? 0 : damage;
            return Math.round(damage);
        },
        url: "https://groups.google.com/forum/#!topic/ingress-discuss/jEnHlKMyl5A"
    }
    // https://groups.google.com/forum/#!topic/ingress-discuss/jEnHlKMyl5A
    /*

    Research shows the following:

    XMPs have a minimum damage, plus a random component. The values are shown below:

    LEVEL: minDamage + ~maxRandomDamage
    L1: 136 + ~180
    L2: 226 + ~300
    L3: 406 + ~540
    L4: 630 + ~840
    L5: 900 + ~1200
    L6: 1260 + ~1680
    L7: 1800 + ~2400
    L8: 2700 + ~3600

    The minimum damage plus the random damage is then multiplied by ½ to the power of (distance to resonator ÷ (burster max range ÷ 5)).

    Finally, there's a chance of a critical hit (which will double the damage). That chance is calculated at (burster level + 1) × 2%. The maximum XMP range is 40 + 2 × (burster level)²

While the decay does have infinite range with this calculation, it is forced to zero after the maximum distance. It is also truncated to an integer (so you can't cause 1496.32673 XM of damage, say).

As for the source... I don't want to say much about that, but I'm almost certain it's 100% reliable. It's from the same place that I learned about portal turrets being the entities responsible for damaging the player when they attack a portal, and the same place I discovered their 80m maximum range. Incidentally, they are classed as targeted "rifle"-style weapons, rather than "untargeted radial" weapons like XMPs.

By the way... I don't know what other calculators use, but maximum portal range in m appears to be 10 × ( (2 × average resonator level) to the power of 4).

These numbers are not taken from field experience.


As far as I can tell, critical hits are calculated on a per-target basis. Otherwise every resonator would either get the critical damage or it wouldn't. The UI does display a "Critical!" message when appropriate.

I would say that optimal firing location depends on the burster level. For anything below 4/5, I'd stand directly on the resonator; for 4/5+, it's more effective to hit all resonators at once by standing on the portal if possible.

     */
};
