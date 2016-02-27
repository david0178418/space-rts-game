import instanceManager from 'instance-manager';

let WeaponDetonation = {
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

		WeaponDetonation.ecsManager.destroyEntity(entity.id);

		// Check if it's dead already
		if(!targetHealth) {
			return;
		}

		targetHealth.current -= detonationFuse.damage;

		// TODO some sort of death system
		if(targetHealth.current <= 0) {
			WeaponDetonation.ecsManager.destroyEntity(detonationFuse.target.id);
		}
	},
};

export default WeaponDetonation;
