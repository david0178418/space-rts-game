import {filter, throttle} from 'lodash';
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
	},

	run: throttle(function(entities) {
		let selectedEntities = filter(entities, function(entity) {
			return entity.selected;
		});

		if(selectedEntities.length === 1) {
			RenderBuildingQueueSystem.ui.setBuildQueue(selectedEntities[0]['entity-spawn-queue'].queue);
		} else {
			RenderBuildingQueueSystem.ui.setBuildQueue(null);
		}
	}, 100),
};

export default RenderBuildingQueueSystem;
