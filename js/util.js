var sqrt2 = 1 / Math.sqrt(2);
var directionModifier = {
	"N": { x: 0, y: -1 },
	"NE": { x: sqrt2, y: -sqrt2 },
	"E": { x: 1, y: 0 },
	"SE": { x: sqrt2, y: sqrt2 },
	"S": { x: 0, y: 1 },
	"SW": { x: -sqrt2, y: sqrt2 },
	"W": { x: -1, y: 0 },
	"NW": { x: -sqrt2, y: -sqrt2 }
}

function xyForResoDistance(distance, direction) {
	var dm = directionModifier[direction];
	var distPix = mInPx(distance);
	return {x: (portalX + dm.x * distPix), y: (portalY + dm.y * distPix)};
}

function distanceToPortalForXY(x, y) {
	var xx = x - portalX;
	var yy = y - portalY;
	var pix = Math.sqrt(Math.pow(x - portalX, 2) + Math.pow(y - portalY, 2));
	m = pixInM(pix);
	//return m > MAX_RESO_RANGE ? MAX_RESO_RANGE : m;   //not this functions job!
	return m;
}

function pixInM(p) {
	return p / rimPix * MAX_RESO_RANGE;
}
function mInPx(m) {
	return m * rimPix / MAX_RESO_RANGE;
}
