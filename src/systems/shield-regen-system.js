import instanceManager from 'instance-manager';

let ShieldHitSystem = {
	components: {
		with:[
			'shield',
		],
	},

	ecsManager: null,
	game: null,

	init() {
		ShieldHitSystem.ecsManager = instanceManager.get('ecs-manager');
		ShieldHitSystem.game = instanceManager.get('game');
	},

	runOne(entity) {
		let shield = entity.shield;

		if(shield.currentPower < shield.maxPower) {
			shield.currentPower = Math.min(shield.maxPower, shield.currentPower + shield.rechargeRate * ShieldHitSystem.game.time.physicsElapsed);
		}
	},
};

export default ShieldHitSystem;
