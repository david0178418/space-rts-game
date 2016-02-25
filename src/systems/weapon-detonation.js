import instanceManager from 'instance-manager';

export default {
	components: {
		with: [
			'detonation-fuse',
		],
		without: [
			'waypoint',
		],
	},

	ecsManager: null,
	game: null,

	init() {
		this.ecsManager = instanceManager.get('ecs-manager');
		this.game = instanceManager.get('game');
	},

	runOne(entity) {
		let detonationFuse = entity['detonation-fuse'];
		let targetHealth = detonationFuse.target.health;

		this.ecsManager.destroyEntity(entity.id);

		// Check if it's dead already
		if(!targetHealth) {
			return;
		}

		targetHealth.current -= detonationFuse.damage;

		// TODO some sort of death system
		if(targetHealth.current <= 0) {
			this.ecsManager.destroyEntity(detonationFuse.target.id);
		}
	},
};
