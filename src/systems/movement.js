import _ from 'lodash';
import instanceManager from 'instance-manager';

export default {
	components: [
		'movable',
		'waypoint',
	],

	init: function() {
		this.game = instanceManager.get('game');
		this.worldEntities = instanceManager.get('world-entities');

		this.runOne = _.bind(this.runOne, this);
	},

	runOne: function(entity) {
		let angle;
		let breakingDistance;
		let distance;
		let movable = entity.getComponent('movable');
		let sprite = entity.getComponent('sprite');
		let waypoint = entity.getComponent('waypoint');

		// d = (Vf^2 - Vf^2) / (2*a)
		breakingDistance = (movable.currentSpeed * movable.currentSpeed) / (2 * movable.acceleration);
		distance = this.game.physics.arcade.distanceToXY(sprite, waypoint.x, waypoint.y);

		if(distance <= breakingDistance) {
			movable.currentSpeed -= movable.acceleration * this.game.time.physicsElapsed;

			if(distance < 1 ||movable.currentSpeed * this.game.time.physicsElapsed >= distance) {
				movable.currentSpeed = 0;
				sprite.position.x = waypoint.x;
				sprite.position.y = waypoint.y;
				entity.removeComponent('waypoint');
				return;
			}
		} else if(movable.currentSpeed < movable.topSpeed) {
			movable.currentSpeed += movable.acceleration * this.game.time.physicsElapsed;

			if(movable.currentSpeed > movable.topSpeed) {
				movable.currentSpeed = movable.topSpeed;
			}
		}

		angle = this.game.math.angleBetweenPoints(sprite.position, waypoint);

		sprite.rotation = angle; // TODO Animate angle change
		sprite.position.x += Math.cos(angle) * movable.currentSpeed * this.game.time.physicsElapsed;
		sprite.position.y += Math.sin(angle) * movable.currentSpeed * this.game.time.physicsElapsed;
	},
};

// TODO Refactor systems and others that need larger references for performance
// See the following jsperf: https://jsperf.com/closure-vs-property/12
// Determine how to best store references to libraries and global instances
