var MAX_RESO_RANGE = 40;
var RESO_RADIUS = 10;
var PORTAL_RADIUS = 20;
var EQUIDISTANT = true;
var DECAY_RATE = .15;

var directions = [ "W", "NW", "N", "NE", "SW", "S", "SE", "E"]; //Actually, I have not idea right now how official Ingress counting 0-7 converts to directions
var ap_level = [0, 10000, 30000, 70000, 150000, 300000, 600000, 1200000];
var xm_level = [3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
var reso_capacity = [1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000];
var burster_dmg = [150, 300, 500, 900, 1200, 1500, 1800, 2700];
var burster_range = [42, 48, 58, 72, 90, 112, 138, 168];
var level_color = ["#fece5a", "#ffa630", "#ff7315", "#e40000", "#fd2992", "#eb26cd", "#c124e0", "#9627f4"];
