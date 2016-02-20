import _ from 'lodash';
import instanceManager from 'instance-manager';

export default {
	components: {
		with: [
			'entity-spawner',
		],
	},

	init() {
		this.game = instanceManager.get('game');
		this.ui = instanceManager.get('ui');
	},

	run: _.throttle(function(entities) {
		let selectedEntities = _.filter(entities, function(entity) {
			return entity.hasComponent('selected');
		});

		if(selectedEntities.length) {
			this.ui.setProductionOptions(selectedEntities[0].getComponent('entity-spawner').availableBlueprints);
		} else {
			this.ui.setProductionOptions(null);
		}
	}, 100),
};
