import {filter, throttle} from 'lodash';
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
	},

	run: throttle(function(entities) {
		let selectedEntities = filter(entities, function(entity) {
			return entity.selected;
		});

		if(selectedEntities.length) {
			RenderProductionOptionsSystem.ui.setProductionOptions(selectedEntities[0]['entity-spawner'].availableBlueprints);
		} else {
			RenderProductionOptionsSystem.ui.setProductionOptions(null);
		}
	}, 100),
};

export default RenderProductionOptionsSystem;
