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
		let targetShield = detonationFuse.target.shield || null;

		WeaponDetonationSystem.ecsManager.destroyEntity(entity.id);

		if(targetShield) {
			targetShield.currentPower = targetShield.currentPower - detonationFuse.damage;

			this.ecsManager.addComponent(detonationFuse.target.id, 'shieldHit', {
				angle: detonationFuse.angle - detonationFuse.target.sprite.rotation - Math.PI,
				size: Math.max(detonationFuse.target.sprite.width, detonationFuse.target.sprite.height),
			});
			return;
		}

		// Check if it's dead already
		if(!targetHealth) {
			return;
		}

		targetHealth.current = targetHealth.current - detonationFuse.damage;

		// TODO some sort of death system
		if(targetHealth.current <= 0) {
			WeaponDetonationSystem.ecsManager.destroyEntity(detonationFuse.target.id);
		}
	},
};

export default WeaponDetonationSystem;
