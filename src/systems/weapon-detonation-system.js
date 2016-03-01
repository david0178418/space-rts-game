import instanceManager from 'instance-manager';

let WeaponDetonationSystem = {
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
		WeaponDetonationSystem.ecsManager = instanceManager.get('ecs-manager');
		WeaponDetonationSystem.game = instanceManager.get('game');
	},

	runOne(entity) {
		let detonationFuse = entity['detonation-fuse'];
		let targetHealth = detonationFuse.target.health;

		WeaponDetonationSystem.ecsManager.destroyEntity(entity.id);

		// Check if it's dead already
		if(!targetHealth) {
			return;
		}

		targetHealth.current -= detonationFuse.damage;

		// TODO some sort of death system
		if(targetHealth.current <= 0) {
			WeaponDetonationSystem.ecsManager.destroyEntity(detonationFuse.target.id);
		}
	},
};

export default WeaponDetonationSystem;
