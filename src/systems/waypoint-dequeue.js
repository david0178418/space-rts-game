import instanceManager from 'instance-manager';

export default {
	components: {
		with: [
			'waypoint-queue',
		],
		without: [
			'waypoint',
		],
	},

	init() {
		this.game = instanceManager.get('game');
		this.worldEntities = instanceManager.get('world-entities');
	},

	runOne(entity) {
		if(!entity.getComponent('waypoint-queue').queue.length) {
			// TODO Implement a "without componets" param to systems
			return;
		}

		let waypointQueue = entity.getComponent('waypoint-queue');

		entity.addComponent('waypoint', waypointQueue.queue.shift());
	},
};
