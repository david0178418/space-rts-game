import {filter, throttle} from 'lodash';
import instanceManager from 'instance-manager';

export default {
	components: {
		with: [
			'entity-spawn-queue',
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

		if(selectedEntities.length === 1) {
			this.ui.setBuildQueue(selectedEntities[0]['entity-spawn-queue'].queue);
		} else {
			this.ui.setBuildQueue(null);
		}
	}, 100),
};
