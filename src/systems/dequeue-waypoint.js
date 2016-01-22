import instanceManager from 'instance-manager';

instanceManager.get('ecs-manager').registerSystem('dequeue-waypoint', {
	components: [
		'waypoint-queue',
	],

	init: function() {
		this.game = instanceManager.get('game');
		this.worldEntities = instanceManager.get('world-entities');
	},

	runOne: function(entity) {
		if(entity.hasComponent('waypoint')) {
			// TODO Implement a "without componets" param to systems
			return;
		}

		let waypointQueue = entity.getComponent('waypoint-queue');

		entity.addComponent('waypoint', waypointQueue.queue.shift());

		if(!waypointQueue.queue.length) {
			entity.removeComponent('waypoint-queue');
		}
	},
});
