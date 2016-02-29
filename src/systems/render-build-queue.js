import {throttle} from 'lodash';
import instanceManager from 'instance-manager';

let RenderBuildingQueueSystem = {
	components: {
		with: [
			'entity-spawn-queue',
		],
	},

	game: null,
	ui: null,

	init() {
		RenderBuildingQueueSystem.game = instanceManager.get('game');
		RenderBuildingQueueSystem.ui = instanceManager.get('ui');

		RenderBuildingQueueSystem.run = throttle(RenderBuildingQueueSystem.run, 150);
	},

	run(entities) {
		let selectedEntities = [];

		for(let x = 0; x < entities.length; x++) {
			if(entities[x].selected) {
				selectedEntities[selectedEntities.length] = entities[x];
			}
		}

		if(selectedEntities.length === 1) {
			RenderBuildingQueueSystem.ui.setBuildQueue(selectedEntities[0]['entity-spawn-queue'].queue);
		} else {
			RenderBuildingQueueSystem.ui.setBuildQueue(null);
		}
	},
};

export default RenderBuildingQueueSystem;
