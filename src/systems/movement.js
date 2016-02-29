import instanceManager from 'instance-manager';
import Utils from './_utils';

let MovementSystem = {
	components: {
		with: [
			'movable',
			'waypoint',
		],
		without: [
			'breaks',
		],
	},

	ecsManager: null,
	game: null,
	worldEntities: null,

	init() {
		MovementSystem.ecsManager = instanceManager.get('ecs-manager');
		MovementSystem.game = instanceManager.get('game');
		MovementSystem.worldEntities = instanceManager.get('world-entities');
	},

	runOne(entity) {
		let angle;
		let breakingDistance;
		let distance;
		let movable = entity.movable;
		let sprite = entity.sprite;
		let waypoint = entity.waypoint;

		breakingDistance = Utils.breakingDistance(movable.currentSpeed, movable.acceleration);
		distance = Utils.distanceBetween({
			x: sprite.x,
			y: sprite.y,
		}, waypoint);

		if(distance <= breakingDistance) {
			movable.currentSpeed -= movable.acceleration * MovementSystem.game.time.physicsElapsed;

			if(distance < 1 ||movable.currentSpeed * MovementSystem.game.time.physicsElapsed >= distance) {
				movable.currentSpeed = 0;
				sprite.position.x = waypoint.x;
				sprite.position.y = waypoint.y;
				MovementSystem.ecsManager.removeComponent(entity.id, 'waypoint');
				return;
			}
		} else if(movable.currentSpeed < movable.topSpeed) {
			movable.currentSpeed += movable.acceleration * MovementSystem.game.time.physicsElapsed;

			if(movable.currentSpeed > movable.topSpeed) {
				movable.currentSpeed = movable.topSpeed;
			}
		}

		// TODO Cache angle
		angle = Utils.angleBetween({
			x: sprite.position.x,
			y: sprite.position.y,
		}, waypoint);

		sprite.rotation = angle; // TODO Animate angle change
		sprite.position.x += Math.cos(angle) * movable.currentSpeed * MovementSystem.game.time.physicsElapsed;
		sprite.position.y += Math.sin(angle) * movable.currentSpeed * MovementSystem.game.time.physicsElapsed;
	},
};

export default MovementSystem;

// TODO Refactor systems and others that need larger references for performance
// See the following jsperf: https://jsperf.com/closure-vs-property/12
// Determine how to best store references to libraries and global instances
