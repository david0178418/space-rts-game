import _ from 'lodash';
import instanceManager from 'instance-manager';

instanceManager.get('ecs-manager').registerSystem('movement', {
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
		let distance;
		let movable = entity.getComponent('movable');
		let sprite = entity.getComponent('sprite');
		let waypoint = entity.getComponent('waypoint');

		if(movable.currentSpeed < movable.topSpeed) {
			movable.currentSpeed += movable.acceleration * this.game.time.physicsElapsed;

			if(movable.currentSpeed > movable.topSpeed) {
				movable.currentSpeed = movable.topSpeed;
			}
		}

		distance = this.game.physics.arcade.distanceToXY(sprite, waypoint.x, waypoint.y);

		if(distance < movable.currentSpeed) {
			sprite.position.x = waypoint.x;
			sprite.position.y = waypoint.y;
			entity.removeComponent('waypoint');
		} else {
			let angle = this.game.math.angleBetweenPoints(sprite.position, waypoint);

			sprite.position.x += Math.cos(angle) * movable.currentSpeed;
			sprite.position.y += Math.sin(angle) * movable.currentSpeed;
			sprite.rotation = angle; // TODO Animate angle change
		}
	},
});

// TODO Refactor systems and others that need larger references for performance
// See the following jsperf: https://jsperf.com/closure-vs-property/12
// Determine how to best store references to libraries and global instances
