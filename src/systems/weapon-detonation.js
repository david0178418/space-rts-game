import instanceManager from 'instance-manager';

export default {
	components: [
		'detonation-fuse',
	],

	init: function() {
		this.game = instanceManager.get('game');
		this.worldEntities = instanceManager.get('world-entities');
	},

	runOne: function(entity) {
		if(entity.hasComponent('waypoint')) {
			return;
		}

		let detonationFuse = entity.getComponent('detonation-fuse');
		let targetHealth = detonationFuse.target.getComponent('health');

		entity.destroy();

		// Check if it's dead already
		if(!targetHealth) {
			return;
		}

		targetHealth.current -= detonationFuse.damage;

		// TODO some sort of death system
		if(targetHealth.current <= 0) {
			detonationFuse.target.destroy();
		}
	},
};