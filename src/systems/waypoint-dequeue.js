import {bind} from 'lodash';
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

	ecsManager: null,
	game: null,

	init() {
		this.game = instanceManager.get('game');
		this.ecsManager = instanceManager.get('ecs-manager');

		this.runOne = bind(this.runOne, this);
	},

	runOne(entity) {
		if(!entity['waypoint-queue'].queue.length) {
			// TODO Implement a "without componets" param to systems
			return;
		}

		let waypointQueue = entity['waypoint-queue'];

		this.ecsManager.addComponent(entity.id, 'waypoint', waypointQueue.queue.shift());
	},
};
