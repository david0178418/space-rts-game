import {bind} from 'lodash';
import instanceManager from 'instance-manager';

export default {
	components: {
		with: [
			'movable',
			'breaks',
		],
	},

	game: null,
	ecsManager: null,

	init() {
		this.game = instanceManager.get('game');
		this.ecsManager = instanceManager.get('ecsManager');

		this.runOne = bind(this.runOne, this);
	},

	runOne(entity) {
		if(entity.waypoint) {
			entity['waypoint-queue'].queue.unshift(entity.waypoint);
			this.ecsManager.removeComponent(entity.id, 'waypoint');
		}

		let movable = entity.getComponent('movable');

		if(movable.currentSpeed === 0) {
			return;
		}

		let sprite = entity.getComponent('sprite');

		movable.currentSpeed -= movable.acceleration * this.game.time.physicsElapsed;

		if(movable.currentSpeed <= 0) {
			movable.currentSpeed = 0;
		} else {
			sprite.position.x += Math.cos(sprite.rotation) * movable.currentSpeed * this.game.time.physicsElapsed;
			sprite.position.y += Math.sin(sprite.rotation) * movable.currentSpeed * this.game.time.physicsElapsed;
		}
	},
};
