import instanceManager from 'instance-manager';

let WaypointDequeueSystem = {
	components: {
		with: [
			'waypoint-queue',
		],
		without: [
			'waypoint',
		],
	},

	ecsManager: null,
	game: null,

	init() {
		WaypointDequeueSystem.game = instanceManager.get('game');
		WaypointDequeueSystem.ecsManager = instanceManager.get('ecs-manager');
	},

	runOne(entity) {
		if(!entity['waypoint-queue'].queue.length) {
			// TODO Implement a "without componets" param to systems
			return;
		}

		let waypointQueue = entity['waypoint-queue'];

		WaypointDequeueSystem.ecsManager.addComponent(entity.id, 'waypoint', waypointQueue.queue.shift());
	},
};

export default WaypointDequeueSystem;
