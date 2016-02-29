export default {
	angleBetween(point1, point2) {
		return Math.atan2(point2.y - point1.y, point2.x - point1.x);
	},

	breakingDistance(currentSpeed, acceleration) {
		// d = (Vf^2 - Vf^2) / (2*a)
		return (currentSpeed * currentSpeed) / (2 * acceleration);
	},

	distanceBetween(posA, posB) {
		let dx = posA.x - posB.x;
		let dy = posA.y - posB.y;

		return Math.sqrt(dx * dx + dy * dy);
	},
};
