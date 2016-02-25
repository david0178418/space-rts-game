import {bind} from 'lodash';
import instanceManager from 'instance-manager';
import Utils from './_utils';

export default {
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
		this.ecsManager = instanceManager.get('ecs-manager');
		this.game = instanceManager.get('game');
		this.worldEntities = instanceManager.get('world-entities');

		this.runOne = bind(this.runOne, this);
	},

	runOne(entity) {
		let angle;
		let breakingDistance;
		let distance;
		let movable = entity.movable;
		let sprite = entity.sprite;
		let waypoint = entity.waypoint;

		breakingDistance = Utils.breakingDistance(movable.currentSpeed, movable.acceleration);
		distance = Utils.distanceBetween(sprite, waypoint);

		if(distance <= breakingDistance) {
			movable.currentSpeed -= movable.acceleration * this.game.time.physicsElapsed;

			if(distance < 1 ||movable.currentSpeed * this.game.time.physicsElapsed >= distance) {
				movable.currentSpeed = 0;
				sprite.position.x = waypoint.x;
				sprite.position.y = waypoint.y;
				this.ecsManager.removeComponent(entity.id, 'waypoint');
				return;
			}
		} else if(movable.currentSpeed < movable.topSpeed) {
			movable.currentSpeed += movable.acceleration * this.game.time.physicsElapsed;

			if(movable.currentSpeed > movable.topSpeed) {
				movable.currentSpeed = movable.topSpeed;
			}
		}

		// TODO Cache angle
		angle = Utils.angleBetween(sprite.position, waypoint);

		sprite.rotation = angle; // TODO Animate angle change
		sprite.position.x += Math.cos(angle) * movable.currentSpeed * this.game.time.physicsElapsed;
		sprite.position.y += Math.sin(angle) * movable.currentSpeed * this.game.time.physicsElapsed;
	},
};

// TODO Refactor systems and others that need larger references for performance
// See the following jsperf: https://jsperf.com/closure-vs-property/12
// Determine how to best store references to libraries and global instances
