import instanceManager from 'instance-manager';

let BreakingSystem = {
	components: {
		with: [
			'movable',
			'breaks',
		],
	},

	game: null,
	ecsManager: null,

	init() {
		BreakingSystem.game = instanceManager.get('game');
		BreakingSystem.ecsManager = instanceManager.get('ecs-manager');
	},

	runOne(entity) {
		if(entity.waypoint) {
			entity['waypoint-queue'].queue.unshift(entity.waypoint);
			BreakingSystem.ecsManager.removeComponent(entity.id, 'waypoint');
		}

		let movable = entity.movable;

		if(movable.currentSpeed === 0) {
			return;
		}

		let sprite = entity.sprite;

		movable.currentSpeed -= movable.acceleration * BreakingSystem.game.time.physicsElapsed;

		if(movable.currentSpeed <= 0) {
			movable.currentSpeed = 0;
		} else {
			sprite.position.x += Math.cos(sprite.rotation) * movable.currentSpeed * BreakingSystem.game.time.physicsElapsed;
			sprite.position.y += Math.sin(sprite.rotation) * movable.currentSpeed * BreakingSystem.game.time.physicsElapsed;
		}
	},
};

export default BreakingSystem;
