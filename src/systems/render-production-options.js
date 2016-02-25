import {filter, throttle} from 'lodash';
import instanceManager from 'instance-manager';

export default {
	components: {
		with: [
			'entity-spawner',
		],
	},

	game: null,
	ui: null,

	init() {
		this.game = instanceManager.get('game');
		this.ui = instanceManager.get('ui');
	},

	run: throttle(function(entities) {
		let selectedEntities = filter(entities, function(entity) {
			return entity.selected;
		});

		if(selectedEntities.length) {
			this.ui.setProductionOptions(selectedEntities[0]['entity-spawner'].availableBlueprints);
		} else {
			this.ui.setProductionOptions(null);
		}
	}, 100),
};
