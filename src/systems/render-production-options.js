import {throttle} from 'lodash';
import instanceManager from 'instance-manager';

let RenderProductionOptionsSystem = {
	components: {
		with: [
			'entity-spawner',
		],
	},

	game: null,
	ui: null,

	init() {
		RenderProductionOptionsSystem.game = instanceManager.get('game');
		RenderProductionOptionsSystem.ui = instanceManager.get('ui');

		RenderProductionOptionsSystem.run = throttle(RenderProductionOptionsSystem.run, 150);
	},

	run(entities) {
		let selectedEntities = [];

		for(let x = 0; x < entities.length; x++) {
			if(entities[x].selected) {
				selectedEntities[selectedEntities.length] = entities[x];
			}
		}

		if(selectedEntities.length) {
			RenderProductionOptionsSystem.ui.setProductionOptions(selectedEntities[0]['entity-spawner'].availableBlueprints);
		} else {
			RenderProductionOptionsSystem.ui.setProductionOptions(null);
		}
	},
};

export default RenderProductionOptionsSystem;
