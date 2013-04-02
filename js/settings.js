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
            return damage;
        }
    },
    square: {
        title: "Square",
            func: function (distanceM, maxRange, maxDamage, level) {
                var damage = maxDamage * ( 1 - Math.pow(distanceM / maxRange, 2) );
                damage = damage < 0 ? 0 : damage;
                return damage;
            }
    },
    reddit: {
        title: "Reddit",
        func: function (distanceM, maxRange, maxDamage, level) {
            // L8: (2700)*0.5^(x/(168/5))) as of reddit: http://vi.reddit.com/r/Ingress/comments/17umoi/has_burster_falloff_ever_been_confirmed_to_be/
            var damage = maxDamage * Math.pow(.5, distanceM / (maxRange / 5));
            damage = damage < 0 ? 0 : damage;
            return damage;
        }
    }
};
