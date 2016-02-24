import {bind} from 'lodash';
import instanceManager from 'instance-manager';

export default {
	components: {
		with: [
			'movable',
			'breaks',
		],
	},

	init() {
		this.game = instanceManager.get('game');

		this.runOne = bind(this.runOne, this);
	},

	runOne(entity) {
		if(entity.hasComponent('waypoint')) {
			entity.getComponent('waypoint-queue').queue.unshift(entity.getComponent('waypoint'));
			entity.removeComponent('waypoint');
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
