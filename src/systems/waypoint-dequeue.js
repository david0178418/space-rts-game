import instanceManager from 'instance-manager';

let WaypointDequeue = {
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
		this.game = instanceManager.get('game');
		this.ecsManager = instanceManager.get('ecs-manager');
	},

	runOne(entity) {
		if(!entity['waypoint-queue'].queue.length) {
			// TODO Implement a "without componets" param to systems
			return;
		}

		let waypointQueue = entity['waypoint-queue'];

		WaypointDequeue.ecsManager.addComponent(entity.id, 'waypoint', waypointQueue.queue.shift());
	},
};

export default WaypointDequeue;
