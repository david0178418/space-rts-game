import instanceManager from 'instance-manager';

export default {
	components: [
		'waypoint-queue',
	],

	init: function() {
		this.game = instanceManager.get('game');
		this.worldEntities = instanceManager.get('world-entities');
	},

	runOne: function(entity) {
		if(entity.hasComponent('waypoint') || !entity.getComponent('waypoint-queue').queue.length) {
			// TODO Implement a "without componets" param to systems
			return;
		}

		let waypointQueue = entity.getComponent('waypoint-queue');

		entity.addComponent('waypoint', waypointQueue.queue.shift());
	},
};
