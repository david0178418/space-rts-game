import instanceManager from 'instance-manager';

let Breaking = {
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
		this.ecsManager = instanceManager.get('ecs-manager');
	},

	runOne(entity) {
		if(entity.waypoint) {
			entity['waypoint-queue'].queue.unshift(entity.waypoint);
			Breaking.ecsManager.removeComponent(entity.id, 'waypoint');
		}

		let movable = entity.movable;

		if(movable.currentSpeed === 0) {
			return;
		}

		let sprite = entity.sprite;

		movable.currentSpeed -= movable.acceleration * Breaking.game.time.physicsElapsed;

		if(movable.currentSpeed <= 0) {
			movable.currentSpeed = 0;
		} else {
			sprite.position.x += Math.cos(sprite.rotation) * movable.currentSpeed * Breaking.game.time.physicsElapsed;
			sprite.position.y += Math.sin(sprite.rotation) * movable.currentSpeed * Breaking.game.time.physicsElapsed;
		}
	},
};

export default Breaking
