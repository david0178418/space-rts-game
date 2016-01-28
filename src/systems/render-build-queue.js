import _ from 'lodash';
import instanceManager from 'instance-manager';

instanceManager.get('ecs-manager').registerSystem('ui-render', {
	components: [
		'entity-spawn-queue',
	],

	init() {
		this.game = instanceManager.get('game');
		this.ui = instanceManager.get('ui');
	},

	run: _.throttle(function(entities) {
		let selectedEntities = _.filter(entities, function(entity) {
			return entity.hasComponent('selected');
		});

		if(selectedEntities.length === 1) {
			this.ui.setBuildQueue(selectedEntities[0].getComponent('entity-spawn-queue').queue);
		} else {
			this.ui.setBuildQueue(null);
		}
	}, 100),
});
